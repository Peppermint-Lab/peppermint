const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const {create, getAll, deleteClient, updateClient } = require('../controller/client')

router
    .route('/create')
    .post(auth, create)

router
    .route('/allclients')
    .get(auth, getAll)

router
    .route('/delete/:id')
    .delete(auth, deleteClient)

router
    .route('/update')
    .put(auth, updateClient)

module.exports = router;