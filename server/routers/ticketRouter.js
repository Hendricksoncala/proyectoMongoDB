const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Definir rutas para tickets
router.get('/', ticketController.obtenerTodosTickets); 
router.get('/:id', ticketController.obtenerTicketPorId);
router.post('/', ticketController.crearTicket);
// ... otras rutas para tickets (actualizar, eliminar, etc.)

module.exports = router;