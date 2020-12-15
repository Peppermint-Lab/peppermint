const express = require('express');
const router = express.Router();
const reqLogin = require('../middleware/authCheck');

const {saveNote, getNotes, deleteNote, updateNote} = require('../controller/notes');

router
    .route('/saveNote')
    .post(reqLogin, saveNote)

router
    .route('/getNotes')
    .get(reqLogin, getNotes)

router
    .route('/deleteNote/:id')
    .delete(reqLogin, deleteNote)

router
    .route('/updateNote')
    .put(reqLogin, updateNote)

module.exports = router;