// backend/middleware/mailer.js
const nodemailer = require('nodemailer')
const dotenv = require('dotenv')
dotenv.config()

// Set up the transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use other services like Yahoo, Outlook, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email id
        pass: process.env.EMAIL_PASS, // Your email password or app password
    },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
        return info;  // Return the info object for further logging
    } catch (error) {
        console.error(`Error sending email: ${error}`);
        throw error;  // Rethrow the error to handle it in the calling code
    }
};

module.exports = sendEmail;
