const express = require('express')
const controller = require('./user.controller')

const router = express.Router()
const auth = require('../../auth/auth.service')
// router.get("/", controller.index);
router.post('/add-user/', auth.hasRole(['admin', 'master']), controller.createAccount)
router.get('/get-users/', auth.hasRole(['admin', 'master']), controller.getListUsers)
router.get('/get-user/:id', auth.hasRole(['admin', 'master']), controller.getUser)
router.put('/update-user/:id', auth.hasRole(['admin', 'master']), controller.updateUser)
router.get('/get-profile/', auth.hasRole(['master', 'admin', 'user']), controller.getProfile)
router.post('/create-user/', controller.createUser)
module.exports = router
