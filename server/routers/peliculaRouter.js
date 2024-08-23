
const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController');

router.get('/', peliculaController.obtenerTodasPeliculas);
router.get('/:id', peliculaController.obtenerDetallesPelicula);
router.post('/', peliculaController.crearPelicula);
router.put('/:id', peliculaController.actualizarPelicula);
router.delete('/:id', peliculaController.eliminarPelicula);
router.get('/buscar/:nombre', peliculaController.buscarPeliculasPorNombre);
router.get('/en_cartelera', peliculaController.obtenerPeliculasEnCartelera);
router.get('/proximamente', peliculaController.obtenerPeliculasProximamente);

module.exports = router;