const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuariasController')

router.post('/create', controller.create)
router.post('/login', controller.login)

<<<<<<< HEAD
module.exports = router
=======
module.exports = router

>>>>>>> afef92b (criando camadas de segurança a API)
