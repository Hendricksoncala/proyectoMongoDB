const { validationResult } = require("express-validator")
const Sala = require ("../models/salaModel")



/**
 * Crea una nueva sala.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el ID de la sala creada o un mensaje de error en caso de fallo.
 */
exports.crearSala = async (req, res) => {
    try {
        const salaData = req.body; 
        const salaId = await Sala.create(salaData);
        res.status(201).json({ _id: salaId }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtiene todas las salas.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la lista de salas o un mensaje de error en caso de fallo.
 */
exports.obtenerTodasSalas = async (req, res) => {
    try {
        const salas = await Sala.getAll();
        res.status(200).json(salas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtiene una sala por su ID.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la sala encontrada o un mensaje de error en caso de fallo.
 */
exports.obtenerSalaPorId = async (req, res) => {
    try {
        const salaId = req.params.id;
        const sala = await Sala.getById(salaId);
        res.status(200).json(sala);
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};



// ... (Otros métodos del controlador para actualizar y eliminar salas)