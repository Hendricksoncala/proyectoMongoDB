const Funcion = require('../models/funcionModel.cjs');
const { ObjectId } = require("mongodb");
const { validationResult } = require('express-validator');
const funcionValidator = require('../validators/funcionValidator.cjs');

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
        res.status(500).json({ error: 'Error interno del servidor al obtener las funciones' });
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

        // Validar que el id sea un ObjectId válido
        if (!ObjectId.isValid(funcionId)) {
            return res.status(400).json({ error: 'ID de función inválido' });
        }

        const funcion = await Funcion.getById(funcionId);
        res.status(200).json(funcion);
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al obtener la función' });
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
        // Aplicar las validaciones para crear una función
        await Promise.all(funcionValidator.validarCrearFuncion.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const funcionData = req.body; 
        const funcionId = await Funcion.create(funcionData);
        res.status(201).json({ _id: funcionId });
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al crear la función' });
    }
};

/**
 * Actualiza los datos de una función existente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la actualización o un mensaje de error en caso de fallo.
 */
exports.actualizarFuncion = async (req, res) => {
    try {
        const funcionId = req.params.id;
        const funcionData = req.body; 

        // Validaciones 
        if (!ObjectId.isValid(funcionId)) {
            return res.status(400).json({ error: 'ID de función inválido' });
        }

        // Aplicar las validaciones para actualizar una función
        await Promise.all(funcionValidator.validarActualizarFuncion.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const resultado = await Funcion.update(funcionId, funcionData);
        res.status(200).json({ message: 'Función actualizada correctamente' });
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al actualizar la función' });
        }
    }
};

/**
 * Elimina una función.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la eliminación o un mensaje de error en caso de fallo.
 */
exports.eliminarFuncion = async (req, res) => {
    try {
        const funcionId = req.params.id;

        // Validaciones 
        if (!ObjectId.isValid(funcionId)) {
            return res.status(400).json({ error: 'ID de función inválido' });
        }

        await Funcion.delete(funcionId);
        res.status(200).json({ message: 'Función eliminada correctamente' });
    } catch (error) {
        if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al eliminar la función' });
        }
    }
};

exports.obtenerAsientosDeFuncion = async (req, res) => {
    try {
      const funcionId = new ObjectId(req.params.funcionId);
  
      const funcion = await Funcion.findById(funcionId).populate('asientosOcupados'); 
  
      if (!funcion) {
        return res.status(404).json({ error: 'Función no encontrada' });
      }
  
      const asientosOcupados = funcion.asientosOcupados; 
      res.json(asientosOcupados);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener asientos de la función' });
    }
  };
  