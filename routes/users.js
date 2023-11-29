const express = require('express')
const router = express.Router()
const controllers = require('../controllers/users')

router.post('/register', controllers.register)
router.post('/login', controllers.login)
router.post('/forgetPass', controllers.forgetPassword)

module.exports = router