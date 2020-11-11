const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const { createTicket, unissuedTickets, openTickets, completedTickets} = require('../controller/ticket')

router  
    .route('/createTicket')
    .post(createTicket)

router
    .route('/unissuedTickets')
    .get(auth, unissuedTickets)

router
    .route('/openedTickets')
    .get(auth, openTickets)

router
    .route('/completedTickets')
    .get(auth, completedTickets)

module.exports = router;

