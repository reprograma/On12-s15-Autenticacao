const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuariasController')

// criar usuario novo
router.post('/create', controller.create)

// fazer o login com o usuario
router.post('/login', controller.login);

module.exports = router