// cron/membershipCron.js
const cron = require('node-cron');
const { Membership, Invoice, AddOnService } = require('../models/index');
const nodemailer = require('nodemailer');
const myemail = process.env.SENDER_EMAIL;
const mypassword = process.env.GOGGLE_PASS_KEY;
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myemail,
        pass:mypassword
    }
});

const sendReminderEmail = (email, subject, body) => {
    const mailOptions = {
        from: myemail,
        to: email,
        subject: subject,
        text: body
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Email sent: ' + info.response);
    });
};

const checkMemberships = async () => {
    const today = new Date();

    // Query for memberships due soon
    const memberships = await Membership.findAll();
    memberships.forEach(async (membership) => {
        if (membership.isFirstMonth) {
            const reminderDate = new Date(membership.dueDate);
            reminderDate.setDate(reminderDate.getDate() - 7);
            if (today >= reminderDate) {
                const addOnServices = await AddOnService.findAll({ where: { membershipId: membership.membershipId } });
                const totalAmount = membership.totalAmount + addOnServices.reduce((sum, service) => sum + service.monthlyAmount, 0);
                const body = `Reminder for ${membership.membershipType}. Total amount: ${totalAmount}. Due on: ${membership.dueDate}`;
                sendReminderEmail(membership.email, `Fitness+ Membership Reminder - ${membership.membershipType}`, body);
            }
        } else {
            const addOnServices = await AddOnService.findAll({ where: { membershipId: membership.membershipId } });
            addOnServices.forEach((service) => {
                const monthlyDueDate = new Date(membership.monthlyDueDate);
                if (today.getDate() === monthlyDueDate.getDate()) {
                    const body = `Reminder for ${service.serviceName}. Monthly amount: ${service.monthlyAmount}.`;
                    sendReminderEmail(membership.email, `Fitness+ Add-on Service Reminder - ${service.serviceName}`, body);
                }
            });
        }
    });
};

cron.schedule('0 0 * * *', checkMemberships);

module.exports = checkMemberships;
