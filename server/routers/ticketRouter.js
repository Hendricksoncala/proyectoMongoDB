const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.get('/', ticketController.obtenerTodosTickets);   
 
router.get('/:id', ticketController.obtenerTicketPorId);
router.post('/', ticketController.crearTicket);
// ... otras rutas para tickets 

module.exports = router;