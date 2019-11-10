
const express = require('express')
require('./passport').setup()

const router = express.Router()
router.use('/admin', require('./admin'))
router.use('/user', require('./user'))

module.exports = router
