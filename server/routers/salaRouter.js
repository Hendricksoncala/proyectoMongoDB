const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController'); 

// Definir rutas para salas
router.get('/', salaController.obtenerTodasSalas); 
router.get('/:id', salaController.obtenerSalaPorId);
router.post('/', salaController.crearSala);
// ... otras rutas para salas (actualizar, eliminar, etc.)

module.exports = router;