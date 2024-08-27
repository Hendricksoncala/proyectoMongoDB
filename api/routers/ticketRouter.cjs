const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController.cjs');

// Definir rutas para tickets
router.get('/', ticketController.obtenerTodosTickets);
router.get('/:id', ticketController.obtenerTicketPorId);
router.post('/', ticketController.crearTicket);
// Puedes agregar más rutas aquí según las necesidades de tu aplicación (actualizar, eliminar, etc.)

module.exports = router;