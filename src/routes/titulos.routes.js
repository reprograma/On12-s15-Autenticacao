const express = require('express')
const router = express.Router()
const controller = require('../controllers/tituloController')

//listar todos os titulos/get/find
router.get('/', controller.getAll)

//criar um novo titulo/post/save
router.post('/', controller.createTitle)

module.exports = router