
const nodemailer = require('nodemailer');

const requiredEnv = ['GMAIL_USERNAME', 'GMAIL_PASSWORD'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

// Reuse transporter for efficiency
const transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for 587 (TLS/STARTTLS)
  auth: {
    user: process.env.GMAIL_USERNAME, // Your Gmail address
    pass: process.env.GMAIL_PASSWORD  // Your Gmail password or App Password
  },
});

/**
 * Send an email using Gmail SMTP via Nodemailer.
 * @param {Object} options
 * @param {string} options.email - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 * @param {string} [options.text] - Plain text body (optional)
 */
const sendEmail = async (options) => {
  if (!options || !options.email || !options.subject || !options.html) {
    throw new Error("Missing required email options: email, subject, html");
  }

  try {
    const info = await transporter.sendMail({
      from: `"Trust Wallet" <${process.env.GMAIL_USERNAME}>`,
      to: options.email,
      subject: options.subject,
      html: options.html,
      text: options.text || undefined
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log("Message sent: %s", info.messageId);
    }
    return info;
  } catch (err) {
    console.error("Error sending email:", err.message);
    throw err;
  }
};

module.exports = sendEmail;
