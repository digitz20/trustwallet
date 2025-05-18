const router = require('express').Router()

const {sendBulkEmailDefault} = require('../controller/userController')

router.post('/sendmail', sendBulkEmailDefault)

module.exports = router