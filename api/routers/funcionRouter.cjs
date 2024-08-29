const express = require('express');
const router = express.Router();
const funcionController = require('../controllers/funcionController.cjs');
const asientoController = require('../controllers/asientoController.cjs');   

// Definir rutas para funciones
router.get('/', funcionController.obtenerTodasFunciones); 
router.get('/:id', funcionController.obtenerFuncionPorId);
router.post('/', funcionController.crearFuncion);
router.get('/:funcionId/asientos', funcionController.obtenerAsientosDeFuncion); 
router.post('/:funcionId/reservar', asientoController.reservarAsientos);

// ... otras rutas para funciones (actualizar, eliminar, etc.)

module.exports = router;