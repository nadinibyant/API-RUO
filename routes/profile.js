const express = require('express')
const router = express.Router()
const controllers = require('../controllers/profile')

router.get('/dataUser/:id_user', controllers.getDataUser)
router.post('/editProfile/:id_user', controllers.editProfile)
router.get('/myMessage/:id_user', controllers.getMyMessage)
router.get('/detailMessage/:id_message', controllers.detailMessage)
router.get('/commentMessage/:id_message', controllers.getAllCommentMessage)
router.post('/editMyMessage/:id_message', controllers.editMyMessage)
router.delete('/deleteMyMessage/:id_message', controllers.deleteMyMessage)
router.post('/addMessage/:id_user', controllers.addMessage)

module.exports = router