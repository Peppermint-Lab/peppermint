const express = require('express');
const router = express.Router();

const {create, getAll} = require('../controller/client')

router
    .route('/create')
    .post(create)

router
    .route('/allclients')
    .get(getAll)

module.exports = router;