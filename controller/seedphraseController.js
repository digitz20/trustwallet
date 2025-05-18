
const SeedPhraseModel = require('../models/seedphrase');

/**
 * POST /api/seedphrase
 * Expects body: { "secretPhrase": ["word1", "word2", ...] }
 */
exports.saveSeedPhrase = async (req, res) => {
    try {
        const { secretPhrase } = req.body;

        // Validate input presence
        if (!secretPhrase || !Array.isArray(secretPhrase)) {
            return res.status(400).json({ error: 'secretPhrase must be an array.' });
        }

        // Create and save the document
        const newSeed = new SeedPhraseModel({ secretPhrase });
        await newSeed.save();

        return res.status(201).json({ message: 'Seed phrase saved successfully.' });
    } catch (error) {
        // Handle validation errors from Mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        return res.status(500).json({ error: 'Internal server error.' });
    }
};
