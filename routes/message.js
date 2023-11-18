const express = require('express')
const router = express.Router()
const controllers = require('../controllers/message')

router.get('/allMessage', controllers.getAllMessage)
router.get('/getAccount/:id_message', controllers.getAccount)
router.post('/addComment/:id_message', controllers.addComment)

module.exports = router