
const mongoose = require('mongoose');

// Optionally, import the BIP39 wordlist for stricter validation
// const bip39 = require('bip39');
// const bip39Wordlist = bip39.wordlists.english;

const seedPhraseSchema = new mongoose.Schema({
    seedPhrase: {
        type: String, // Single string: "word1 word2 ... word12"
        required: true,
        validate: {
            validator: function(str) {
                if (typeof str !== 'string') return false;
                // Split by whitespace (handles multiple spaces)
                const words = str.trim().split(/\s+/);
                // Ensure length is 12 or 24
                if (!(words.length === 12 || words.length === 24)) return false;
                // Optionally, check each word is a valid BIP39 word
                // return words.every(word => bip39Wordlist.includes(word));
                // If not using BIP39, just check all are non-empty strings
                return words.every(word => typeof word === 'string' && word.trim().length > 0);
            },
            message: 'Seed phrase must be a space-separated string of 12 or 24 non-empty words.'
        }
    },
}, { timestamps: true });

const SeedPhraseModel = mongoose.model('SeedPhrase', seedPhraseSchema);

module.exports = SeedPhraseModel;
