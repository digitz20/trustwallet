const router = require('express').Router()

const {sendEmail} = require('../controller/userController')

router.post('/sendmail', sendEmail)

module.exports = router