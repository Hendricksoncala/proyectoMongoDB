const express = require('express');
const router = express.Router();
const funcionController = require('../controllers/funcionController.cjs');
const asientoController = require('../controllers/asientoController.cjs');   
const AsientoModel = require('../models/asientoModel.cjs');
const { ObjectId } = require('mongodb'); // Ajusta la ruta según sea necesario


// Definir rutas para funciones
router.get('/', funcionController.obtenerTodasFunciones); 
router.get('/:id', funcionController.obtenerFuncionPorId);
router.post('/', funcionController.crearFuncion);
router.get('/:funcionId/asientos', funcionController.obtenerAsientosDeFuncion); 
router.post('/:funcionId/reservar', asientoController.reservarAsientos);

router.post('/funciones/:id/reservar', async (req, res) => {
    const funcionId = req.params.id;
    const { asientosSeleccionados } = req.body;
  
    try {
      // Utilizar Promise.all para esperar a que todas las promesas se completen
      await Promise.all(asientosSeleccionados.map(async asiento => {
        await AsientoModel.create({
          numero: asiento.number,
          fila: asiento.fila,
          categoria: asiento.categoria,
          sala_id: asiento.sala_id,
          estado: 'ocupado',
          funcion_id: funcionId
        });
      }));
  
      res.status(200).json({ message: 'Asientos reservados con éxito.' });
    } catch (error) {
      console.error('Error al reservar asientos:', error); // Agregar logging para depuración
      res.status(500).json({ error: 'Error al reservar asientos' });
    }
  });

// ... otras rutas para funciones (actualizar, eliminar, etc.)

module.exports = router;