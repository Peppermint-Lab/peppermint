const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const {countUnissuedTickets, countOpenedTickets, countCompletedTickets, sessions} = require ('../controller/data');

router  
    .route('/unallocatedTickets')
    .get(auth, countUnissuedTickets)

router
    .route('/openTickets')
    .get(auth, countOpenedTickets)

router
    .route('/completedTickets')
    .get(auth, countCompletedTickets)

module.exports = router;

