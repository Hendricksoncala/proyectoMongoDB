const express = require('express');
const router = express.Router();
const salaController = require('../controllers/salaController.cjs'); 

// Definir rutas para salas
router.get('/', salaController.obtenerTodasSalas); 
router.get('/:id', salaController.obtenerSalaPorId);
router.post('/', salaController.crearSala);
router.put('/:id', salaController.actualizarSala);
router.delete('/:id', salaController.eliminarSala);

module.exports = router;