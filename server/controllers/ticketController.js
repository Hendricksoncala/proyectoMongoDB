const TicketManager = require('../models/ticketsModel'); 
const { ObjectId } = require("mongodb");

/**
 * Crea un nuevo ticket.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el ticket creado o un mensaje de error en caso de fallo.
 */
exports.crearTicket = async (req, res) => {
    try {
        const { funcionId, clienteId, asientoIds, fechaCompra, metodoPago } = req.body;

        // Validaciones (puedes agregar más validaciones según tus necesidades)
        if (!funcionId || !clienteId || !asientoIds || !fechaCompra || !metodoPago) {
            return res.status(400).json({ error: 'Faltan datos obligatorios para crear el ticket' });
        }

        // Convertir IDs a ObjectId
        const funcionObjectId = new ObjectId(funcionId);
        const clienteObjectId = new ObjectId(clienteId);
        const asientoObjectIds = asientoIds.map(id => new ObjectId(id));

        const ticket = await TicketManager.create(
            funcionObjectId, 
            clienteObjectId, 
            asientoObjectIds, 
            new Date(fechaCompra), 
            metodoPago
        );

        res.status(201).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};