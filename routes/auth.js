const express = require('express');
const router = express.Router();

const {Login, Signup} = require('../controller/auth')

router
    .route('/Login')
    .post(Login)

    router
    .route('/Signup')
    .post(Signup)

module.exports = router;