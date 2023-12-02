const express = require('express')
const router = express.Router()
const controllers = require('../controllers/therapy')

router.get('/allTherapy', controllers.allTherapy)
router.get('/myTherapy/:id_user', controllers.myTherapy)
router.post('/addTherapy', controllers.addTherapy)
router.post('/editTherapy/:id_therapy', controllers.editTherapy)
router.delete('/deleteTherapy/:id_therapy', controllers.deleteTherapy)
router.get('/detailTherapy/:id_therapy', controllers.detailTherapy)
router.post('/like/:id_therapy', controllers.like)
router.post('/dislike/:id_therapy', controllers.dislike)
router.delete('/delOtomatic', controllers.deleteOtomatic)


module.exports = router