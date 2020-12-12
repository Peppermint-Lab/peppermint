const express = require('express');
const router = express.Router();

const {create} = require('../controller/client')

router
    .route('/create')
    .post(create)

module.exports = router;