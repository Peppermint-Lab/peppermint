const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const { createTicket, unissuedTickets, openTickets, completedTickets} = require('../controller/ticket')

router  
    .route('/createTicket')
    .post(createTicket)

router
    .route('/unissuedTickets')
    .get(unissuedTickets)

router
    .route('/openedTickets')
    .get(openTickets)

router
    .route('/completedTickets')
    .get(completedTickets)

module.exports = router;

