const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const {countUnissuedTickets, countOpenedTickets, countCompletedTickets} = require ('../controller/data');

router  
    .route('/unissuedTickets')
    .post(auth, countUnissuedTickets)

router
    .route('/openTickets')
    .get(auth, countOpenedTickets)

router
    .route('/completedTickets')
    .get(auth, countCompletedTickets)

module.exports = router;

