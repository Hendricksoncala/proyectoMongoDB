const Funcion = require('../models/funcionModel');
const { ObjectId } = require("mongodb");

/**
 * Obtiene todas las funciones.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la lista de funciones o un mensaje de error en caso de fallo.
 */
exports.obtenerTodasFunciones = async (req, res) => {
    try {
        const funciones = await Funcion.getAll();
        res.status(200).json(funciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtiene una función por su ID.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la función encontrada o un mensaje de error en caso de fallo.
 */
exports.obtenerFuncionPorId = async (req, res) => {
    try {
        const funcionId = req.params.id;
        const funcion = await Funcion.getById(funcionId);
        res.status(200).json(funcion);
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
};

/**
 * Crea una nueva función.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el ID de la función creada o un mensaje de error en caso de fallo.
 */
exports.crearFuncion = async (req, res) => {
    try {
        const funcionData = req.body; 

        // Validaciones (puedes agregar más validaciones según tus necesidades)
        if (!funcionData.peliculaId || !funcionData.salaId || !funcionData.fecha || !funcionData.hora || !funcionData.precio) {
            return res.status(400).json({ error: 'Faltan datos obligatorios para crear la función' });
        }

        const funcionId = await Funcion.create(funcionData);
        res.status(201).json({ _id: funcionId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// exports.obtenerFuncionesPorNombre = async (req, res) => {
//     try{
//         const funcionName = req.params.name
//     }
// }