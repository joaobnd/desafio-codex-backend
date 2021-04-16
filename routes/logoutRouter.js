const express = require('express');
const Logout = require('../controllers/logoutController');

const router = express.Router();

router.route('/').post(Logout.logout);


module.exports = router;