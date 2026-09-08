const express = require('express');
const router = express.Router();

const testJWTCntrl = require('../controllers/test-jwt');

router.post('/sign-up', authCntrl.signup);
router.post('/sign-in', authCntrl.login);

module.exports = router;