const express = require('express');
const router = express.Router();



router.post('/', clienteController.crearCliente);   

// ... otras rutas para clientes

module.exports = router;