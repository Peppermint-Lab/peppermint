const express = require('express');
const router = express.Router();
const {
    isAuth,
  } = require("../middleware/authCheck");

const {saveNote, getNotes, deleteNote, updateNote} = require('../controller/notes');

router
    .route('/saveNote')
    .post(isAuth, saveNote)

router
    .route('/getNotes')
    .get(isAuth, getNotes)

router
    .route('/deleteNote/:id')
    .delete(isAuth, deleteNote)

router
    .route('/updateNote')
    .post(isAuth, updateNote)

module.exports = router;