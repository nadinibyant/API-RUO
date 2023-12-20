const express = require('express')
const router = express.Router()
const controllers = require('../controllers/therapy')

router.get('/allTherapy', controllers.allTherapy)
router.get('/myTherapy/:id_user', controllers.myTherapy)
router.post('/addTherapy/:id_user', controllers.addTherapy)
router.post('/editTherapy/:id_therapy', controllers.editTherapy)
router.delete('/deleteTherapy/:id_therapy', controllers.deleteTherapy)
router.get('/detailTherapy/:id_therapy', controllers.detailTherapy)
router.post('/like/:id_therapy/:id_user', controllers.like)
router.post('/dislike/:id_therapy/:id_user', controllers.dislike)
router.delete('/delOtomatic', controllers.deleteOtomatic)
router.get('/tampilLike/:id_therapy', controllers.tampiLike)
router.get('/tampilDislike/:id_therapy', controllers.tampilDislike)


module.exports = router