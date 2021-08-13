const express = require('express')
const router = express.Router()
const controller = require('../controllers/estudioController')

//listar todos os estudios/get/find
router.get('/', controller.getAll)

//criar um novo estudio/post/save
router.post('/', controller.createStudio)

//listar um estudio/get/findById

//atualizar uma informacao especifica num estudio/patch/findById/save

//deletar um estudio/delete/findById/remove

module.exports = router