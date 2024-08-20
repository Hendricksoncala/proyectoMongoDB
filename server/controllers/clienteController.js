const { validationResult } = require('express-validator'); // Asegúrate de tener express-validator instalado
const ClienteManager = require('../models/clienteModel'); 

/**
 * Crea un nuevo cliente.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con el cliente creado o un mensaje de error en caso de fallo.
 */
exports.crearCliente = async (req, res) => {
    try {
        // Validar los datos de entrada usando express-validator (puedes definir tus propias reglas de validación)
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const nuevoCliente = req.body;
        const clienteCreado = await ClienteManager.create(nuevoCliente);
        res.status(201).json(clienteCreado); 
    } catch (error) {
        res.status(500).json({ error: error.message });
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
        const cliente = await ClienteManager.get({ _id: clienteId });
        res.status(200).json(cliente);
    } catch (error) {
        if (error.message.includes('no encontrado')) {
            res.status(404).json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
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

        // Validar que el id sea un ObjectId válido (puedes usar express-validator o una función auxiliar)
        if (!ObjectId.isValid(clienteId)) {
            return res.status(400).json({ error: 'ID de cliente inválido' });
        }

        // ... (Otras validaciones de updateData si es necesario)

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
        res.status(500).json({ error: error.message });
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