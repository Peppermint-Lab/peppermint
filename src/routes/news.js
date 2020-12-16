const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const {create, getNewsletters } = require('../controller/news');

router
    .route('/create')
    .post(auth, create)

router
    .route('/get')
    .get(auth, getNewsletters)

module.exports = router;