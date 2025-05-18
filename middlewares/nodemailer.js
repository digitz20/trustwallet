
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: process.env.SERVICE,
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.APP_USERNAME,
      pass: process.env.APP_PASSWORD
    },
  });

  // send mail with defined transport object
  try {
    const info = await transporter.sendMail({
      from: `"Trust Wallet" <${process.env.APP_USERNAME}>`, // Friendly display name and authenticated email
      to: options.email, // recipient(s)
      subject: options.subject, // Subject line
      html: options.html, // HTML body
      // Optionally add a plain text version for better deliverability
      text: options.text || undefined
    });

    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

module.exports = sendEmail;
