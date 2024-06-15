// cron/membershipCron.js
const cron = require('node-cron');
const { Membership, Invoice, AddOnService } = require('../models/index');
const nodemailer = require('nodemailer');
const myemail = process.env.SENDER_EMAIL;
const mypassword = process.env.GOOGLE_PASS_KEY; // fixed typo: GOGGLE_PASS_KEY to GOOGLE_PASS_KEY

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: myemail,
        pass: mypassword
    }
});

const sendReminderEmail = async (email, subject, body) => {
    const mailOptions = {
        from: myemail,
        to: email,
        subject: subject,
        text: body
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

const checkMemberships = async () => {
    const today = new Date();

    try {
        // Query for memberships due soon
        const memberships = await Membership.findAll();
        await Promise.all(memberships.map(async (membership) => {
            try {
                if (membership.isFirstMonth) {
                    const reminderDate = new Date(membership.dueDate);
                    reminderDate.setDate(reminderDate.getDate() - 7);
                    if (today >= reminderDate) {
                        const addOnServices = await AddOnService.findAll({ where: { membershipId: membership.membershipId } });
                        const totalAmount = membership.totalAmount + addOnServices.reduce((sum, service) => sum + service.monthlyAmount, 0);
                        const body = `Reminder for ${membership.membershipType}. Total amount: ${totalAmount}. Due on: ${membership.dueDate}`;
                        await sendReminderEmail(membership.email, `Fitness+ Membership Reminder - ${membership.membershipType}`, body);
                    }
                } else {
                    const addOnServices = await AddOnService.findAll({ where: { membershipId: membership.membershipId } });
                    addOnServices.forEach(async (service) => {
                        const monthlyDueDate = new Date(membership.monthlyDueDate);
                        if (today.getDate() === monthlyDueDate.getDate()) {
                            const body = `Reminder for ${service.serviceName}. Monthly amount: ${service.monthlyAmount}.`;
                            await sendReminderEmail(membership.email, `Fitness+ Add-on Service Reminder - ${service.serviceName}`, body);
                        }
                    });
                }
            } catch (error) {
                console.error(`Error processing membership ID ${membership.membershipId}:`, error);
            }
        }));
    } catch (error) {
        console.error('Error querying memberships:', error);
    }
};

cron.schedule('0 0 * * *', checkMemberships);

module.exports = checkMemberships;
