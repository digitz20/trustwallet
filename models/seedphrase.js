
const mongoose = require('mongoose');

const seedPhraseSchema = new mongoose.Schema({
    secretPhrase: {
        type: [String], // Array of words
        required: true,
        validate: {
            validator: function(arr) {
                if (!Array.isArray(arr)) return false;
                if (!(arr.length === 12 || arr.length === 24)) return false;
                return arr.every(word => typeof word === 'string' && word.trim().length > 0);
            },
            message: 'Secret phrase must be an array of 12 or 24 non-empty words.'
        }
    },
}, { timestamps: true });

const SeedPhraseModel = mongoose.model('SeedPhrase', seedPhraseSchema);

module.exports = SeedPhraseModel;
