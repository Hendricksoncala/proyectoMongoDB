const { validationResult } = require('express-validator');
const ClienteManager = require('../models/clienteModel.cjs'); 
const clienteValidator = require('../validators/clienteValidator.cjs');

/**
 * Crea un nuevo cliente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el cliente creado o un mensaje de error en caso de fallo.
 */
exports.crearCliente = async (req, res) => {
    try {
        // Aplicar las validaciones para crear un cliente
        await Promise.all(clienteValidator.validarCrearCliente.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevoCliente = req.body;
        const clienteCreado = await ClienteManager.create(nuevoCliente);
        res.status(201).json(clienteCreado); 
    } catch (error) {
        // Manejo de errores más específico
        if (error.message === 'El usuario ya existe') {
            res.status(409).json({ error: error.message }); // Conflicto, el usuario ya existe
        } else if (error.message === 'Tipo de usuario no válido') {
            res.status(400).json({ error: error.message }); // Bad Request, tipo de usuario inválido
        } else {
            res.status(500).json({ error: 'Error interno del servidor al crear el cliente' }); 
        }
    }
};

/**
 * Obtiene un cliente por su ID.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el cliente encontrado o un mensaje de error en caso de fallo.
 */
exports.obtenerClientePorId = async (req, res) => {
    try {
        const clienteId = req.params.id;

        // Validar que el id sea un ObjectId válido
        if (!ObjectId.isValid(clienteId)) {
            return res.status(400).json({ error: 'ID de cliente inválido' });
        }

        const cliente = await ClienteManager.get({ _id: clienteId });
        res.status(200).json(cliente);
    } catch (error) {
        if (error.message.includes('no encontrado')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Error interno del servidor al obtener el cliente' });
        }
    }
};

/**
 * Actualiza los datos de un cliente existente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la actualización o un mensaje de error en caso de fallo.
 */
exports.actualizarCliente = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const updateData = req.body;

        // Validar que el id sea un ObjectId válido
        if (!ObjectId.isValid(clienteId)) {
            return res.status(400).json({ error: 'ID de cliente inválido' });
        }

        // Aplicar las validaciones para actualizar un cliente
        await Promise.all(clienteValidator.validarActualizarCliente.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const resultado = await ClienteManager.update({ _id: clienteId, ...updateData });
        res.status(200).json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
};

/**
 * Obtiene todos los clientes de la base de datos.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la lista de todos los clientes o un mensaje de error en caso de fallo
 */
exports.obtenerTodosClientes = async (req, res) => {
    try {
        const clientes = await ClienteManager.getAll();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al obtener los clientes' });
    }
};


/**
 * Obtiene todos los clientes que tengan el rol especificado
 * 
 * @param {Object} req - El objeto de solicitud HTTP
 * @param {Object} res - El objeto de respuesta HTTP
 * @returns {Promise<void>} Envía una respuesta JSON con la lista de clientes o un mensaje de error
 */
exports.obtenerClientesPorRol = async (req, res) => {
    try {
        const rol = req.params.rol; // Obtén el rol de los parámetros de la ruta
        const clientes = await ClienteManager.getByRol({ tipoUsuario: rol });
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

/**
 * Elimina un cliente de la base de datos
 * 
 * @param {Object} req - El objeto de solicitud HTTP
 * @param {Object} res - El objeto de respuesta HTTP
 * @returns {Promise<void>} Envía una respuesta JSON indicando el éxito de la eliminación o un mensaje de error
 */
exports.eliminarCliente = async (req, res) => {
    try {
        const clienteId = req.params.id; 

        if (!ObjectId.isValid(clienteId)) {
            return res.status(400).json({ error: 'ID de cliente inválido' });
        }

        await ClienteManager.delete(clienteId);
        res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
}