const express = require('express')
const router = express.Router()
const controller = require('../controllers/tituloController')

//busca titulo por id
router.get('/:id', controller.getId)

//listar todos os titulos/get/find
router.get('/', controller.getAll)

// //criar um novo titulo/post/save
router.post('/', controller.createTitle)

// //deletar um titulo/delete/findById/remove
router.delete('/:id', controller.deletaTitulo)


module.exports = router