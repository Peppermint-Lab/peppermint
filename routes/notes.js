const express = require('express');
const router = express.Router();
const reqLogin = require('../middleware/authCheck');


router
    .route('/saveNote')
    .post(reqLogin, saveNote)

router
    .route('/getNotes')
    .get(reqLogin, getNotes)

module.exports = router;