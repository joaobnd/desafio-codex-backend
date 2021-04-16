const express = require('express');
const Logout = require('../controllers/logoutController');

const router = express.Router();

//rota para logout
router.route('/').post(Logout.logout);


module.exports = router;