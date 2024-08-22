const TicketManager = require('../models/ticketModel'); 
const { ObjectId } = require("mongodb");
const { validationResult } = require('express-validator'); 
const { check } = require('express-validator');

// ... (Otros métodos del controlador)

exports.crearTicket = async (req, res) => {
    try {
        // Validaciones con express-validator (ejemplo)
        await check('funcionId').isMongoId().run(req);
        await check('clienteId').isMongoId().run(req);
        await check('asientoIds').isArray().run(req);
        await check('fechaCompra').isISO8601().toDate().run(req);
        await check('metodoPago').notEmpty().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { funcionId, clienteId, asientoIds, fechaCompra, metodoPago } = req.body;

        // Convertir IDs a ObjectId
        const funcionObjectId = new ObjectId(funcionId);
        const clienteObjectId = new ObjectId(clienteId);
        const asientoObjectIds = asientoIds.map(id => new ObjectId(id));

        const ticket = await TicketManager.create(
            funcionObjectId, 
            clienteObjectId, 
            asientoObjectIds, 
            fechaCompra, 
            metodoPago
        );

        res.status(201).json(ticket);
    } catch (error) {
        if (error.message.includes('no existe') || error.message.includes('no disponible')) {
            res.status(400).json({ error: error.message }); 
        } else {
            res.status(500).json({ error: error.message }); 
        }
    }
};

exports.obtenerTodosTickets = async (req, res) => {
  try {
    const tickets = await TicketManager.getAll(); 
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerTicketPorId = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const ticket = await TicketManager.getById(ticketId); 
    res.status(200).json(ticket);
  } catch (error) {
    if (error.message.includes('no encontrado')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }

};