const express = require('express')
const router = express.Router()
const controllers = require('../controllers/chatTerry')

router.get('/getQuest', controllers.getQuest)
router.post('/answer1/:id_user', controllers.answeQuest1)
router.post('/answer2', controllers.answeQuest2)

module.exports = router