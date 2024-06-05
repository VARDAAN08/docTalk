const nodemailer = require('nodemailer');

const sendEmail = async options => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD, 
        },
        from: "doctalkpracticum@gmail.com",
        tls:{
            rejectUnauthorized:false
        }
    });

    // 2) Define the email options
    const mailOptions = {
        from: 'DOcTalk Verify <doctalkpracticum@gmail.com>',
        to: ["arjundagar28@gmail.com"],
        subject: options.subject,
        text: options.message,
        attachments: options.attachment
    };

    // 3) Actually send the email
    await transporter.sendMail(mailOptions);
    console.log("Email Sent");
};

module.exports = sendEmail;