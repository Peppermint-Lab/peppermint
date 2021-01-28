const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const {create, getAll, deleteClient, updateClient, createNote } = require('../controller/client')

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

router 
    .route('/createNote')
    .post(auth, createNote)

module.exports = router;