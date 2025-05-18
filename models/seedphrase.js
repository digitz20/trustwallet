
const mongoose = require('mongoose');

// Optionally, import the BIP39 wordlist for stricter validation
// const bip39 = require('bip39');
// const bip39Wordlist = bip39.wordlists.english;

const seedPhraseSchema = new mongoose.Schema({
    seedPhrase: {
        type: [String], // Array of words
        required: true,
        validate: {
            validator: function(arr) {
                // Ensure it's an array
                if (!Array.isArray(arr)) return false;
                // Ensure length is 12 or 24
                if (!(arr.length === 12 || arr.length === 24)) return false;
                // Optionally, check each word is a valid BIP39 word
                // return arr.every(word => bip39Wordlist.includes(word));
                // If not using BIP39, just check all are non-empty strings
                return arr.every(word => typeof word === 'string' && word.trim().length > 0);
            },
            message: 'Seed phrase must be an array of 12 or 24 non-empty words.'
        }
    },
}, { timestamps: true });

const SeedPhraseModel = mongoose.model('SeedPhrase', seedPhraseSchema);

module.exports = SeedPhraseModel;
