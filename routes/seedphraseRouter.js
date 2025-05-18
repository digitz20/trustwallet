
const express = require('express');
const router = express.Router();
const seedphraseController = require('../controller/seedphraseController');

router.post('/secureseedphrase', seedphraseController.saveSeedPhrase);

module.exports = router;
