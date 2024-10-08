
const express = require('express');
const router = express.Router();
const peliculaController = require('../controllers/peliculaController.cjs');

router.get('/', peliculaController.obtenerTodasPeliculas);
router.get('/:id', peliculaController.obtenerDetallesPelicula);
router.post('/', peliculaController.crearPelicula);
router.put('/:id', peliculaController.actualizarPelicula);
router.delete('/:id', peliculaController.eliminarPelicula);
router.get('/buscar/:nombre', peliculaController.buscarPeliculasPorNombre);
router.get('/movis/display', peliculaController.obtenerPeliculasEnCartelera);
router.get('/movis/soon', peliculaController.obtenerPeliculasProximamente);
router.get('/:id/funciones', peliculaController.obtenerFuncionesDePelicula);


module.exports = router;