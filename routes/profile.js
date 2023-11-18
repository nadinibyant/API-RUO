const express = require('express')
const router = express.Router()
const controllers = require('../controllers/profile')

router.get('/dataUser', controllers.getDataUser)
router.post('/editProfile', controllers.editProfile)
router.get('/myMessage', controllers.getMyMessage)
router.get('/detailMessage/:id_message', controllers.detailMessage)
router.get('/commentMessage/:id_message', controllers.getAllCommentMessage)
router.post('/editMyMessage/:id_message', controllers.editMyMessage)
router.delete('/deleteMyMessage/:id_message', controllers.deleteMyMessage)
router.post('/addMessage', controllers.addMessage)

module.exports = router