const express = require('express')
const router = express.Router()
const controller = require('../controllers/usuariasController')

router.post('/create', controller.create)
router.post('/login', controller.login)

module.exports = router