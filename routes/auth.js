const express = require('express');
const router = express.Router();

const mid = require('../middleware/authCheck');

const {Login, Signup, Token, userRes} = require('../controller/auth')

router
    .route('/Login')
    .post(Login)

router
    .route('/Signup')
    .post(Signup)

router
    .route('/token')
    .post(mid, Token)

router
    .route('/')
    .get(mid, userRes)


module.exports = router;