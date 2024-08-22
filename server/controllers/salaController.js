const Sala = require('../models/salaModel');

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
 * Actualiza los datos de una sala existente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la actualización o un mensaje de error en caso de fallo.
 */
exports.actualizarSala = async (req, res) => {
    try {
        const salaId = req.params.id;
        const salaData = req.body; 

        // Validaciones (puedes agregar más validaciones según tus necesidades)
        if (!ObjectId.isValid(salaId)) {
            return res.status(400).json({ error: 'ID de sala inválido' });
        }

        const resultado = await Sala.update(salaId, salaData);
        res.status(200).json({ message: 'Sala actualizada correctamente' });
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
};

/**
 * Elimina una sala.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la eliminación o un mensaje de error en caso de fallo.
 */
exports.eliminarSala = async (req, res) => {
    try {
        const salaId = req.params.id;

        // Validaciones (puedes agregar más validaciones según tus necesidades)
        if (!ObjectId.isValid(salaId)) {
            return res.status(400).json({ error: 'ID de sala inválido' });
        }

        await Sala.delete(salaId);
        res.status(200).json({ message: 'Sala eliminada correctamente' });
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
};