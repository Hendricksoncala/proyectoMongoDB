const { validationResult } = require('express-validator');
const ClienteDTO = require('../dto/clienteDto'); // Asegúrate de que la ruta sea correcta
const Cliente = require('../models/clienteModel'); 

const ClienteManager = require('../models/clienteModel');

exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = req.body; // Obtén los datos del cliente de la solicitud
    const clienteCreado = await ClienteManager.create(nuevoCliente);
    res.status(201).json(clienteCreado); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};