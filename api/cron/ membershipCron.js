const { Membership, AddOnService, Invoice } = require('../models/index');
const nodemailer = require('nodemailer');
const Sequelize = require('sequelize');
require('dotenv').config();

const myemail = process.env.SENDER_EMAIL 
const mypassword = process.env.GOGGLE_PASS_KEY 

// Configure nodemailer with your Gmail SMTP settings
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myemail,
        pass: mypassword
    }
});

const checkMemberships = async () => {
    const now = new Date();

    // Check for memberships with upcoming due dates
    const memberships = await Membership.findAll({
        where: {
            dueDate: {
                [Sequelize.Op.lte]: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000) // 7 days from now
            },
            isFirstMonth: true
        }
    });

    for (const membership of memberships) {
        const addOnServices = await AddOnService.findAll({ where: { membershipId: membership.membershipId } });
        const totalAddOnAmount = addOnServices.reduce((sum, service) => sum + service.monthlyAmount, 0);
        const totalAmount = membership.totalAmount + totalAddOnAmount;

        // Send email reminder
        const mailOptions = {
            from: myemail,
            to: membership.email,
            subject: `Fitness+ Membership Reminder - ${membership.membershipType}`,
            text: `Dear ${membership.firstName},\n\nThis is a reminder for your upcoming membership payment. The total amount due is $${totalAmount}.\n\nBest regards,\nFitness+ Team`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });

        // Update isFirstMonth flag
        await membership.update({ isFirstMonth: false });
    }
};

module.exports = checkMemberships;