const express = require('express');
const router = express.Router();
const asientoController = require('../controllers/asientoController');   


router.post('/:funcionId/reservar', asientoController.reservarAsientos);
router.post('/:funcionId/cancelar', asientoController.cancelarReservaAsientos);
router.get('/:salaId', asientoController.obtenerInformacionSala);

module.exports = router;