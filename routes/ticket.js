const express = require('express');
const router = express.Router();
const auth = require('../middleware/authCheck');

const { createTicket, unissuedTickets, openTickets, completedTickets} = require('../controllers/tickets')

router  
    .route('/createTicket')
    .post(createTicket)

router
    .route('/unissuedTickets')
    .get(reqLogin, unissuedTickets)

router
    .route('/openedTickets')
    .get(reqLogin, openTickets)

router
    .route('/completedTickets')
    .get(reqLogin, completedTickets)

module.exports = router;

