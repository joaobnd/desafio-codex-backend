const express = require('express')
const authController = require('../controllers/authController')

const router = express.Router()

//rota para se cadastrar
router.route('/register').post(authController.register)

//rota para fazer login
router.route('/login').post(authController.login)

module.exports = router;