const Pelicula = require('../models/peliculaModel');

/**
 * Obtiene todas las películas disponibles en el catálogo, incluyendo sus horarios de proyección.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la lista de películas o un mensaje de error en caso de fallo.
 */
exports.obtenerTodasPeliculas = async (req, res) => {
    try {
        const peliculas = await Pelicula.getAll();
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/**
 * Obtiene los detalles de una película específica por su ID.
 * 
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con los detalles de la película o un mensaje de error en caso de fallo.
 */
exports.obtenerDetallesPelicula = async (req, res) => {
    try {
        const peliculaId = req.params.id; 
        const pelicula = await Pelicula.getById(peliculaId);
        res.status(200).json(pelicula);
    } catch (error) {
        // Si la película no se encuentra, envía un error 404
        if (error.message.includes('no encontrada')) {
            res.status(404).json({ error: error.message });
        } else {
            // Si es otro tipo de error, envía un error 500
            res.status(500).json({ error: error.message });
        }
    }
};

//opciones creadas por si se necesitan crear o actulizar las peliculas, claro, tambien eliminarlas
exports.crearPelicula = async (req, res) => {
    try {
        const peliculaData = req.body; 
        const peliculaId = await Pelicula.create(peliculaData);
        res.status(201).json({ _id: peliculaId, ...peliculaData }); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.actualizarPelicula = async (req, res) => {
    try {
        const peliculaId = req.params.id;
        const peliculaData = req.body; 
        await Pelicula.update(peliculaId, peliculaData);
        res.status(200).json({ message: 'Película actualizada correctamente' });
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
};

exports.eliminarPelicula = async (req, res) => {
    try {
        const peliculaId = req.params.id;
        await Pelicula.delete(peliculaId);
        res.status(200).json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        res.status(404).json({ error: error.message }); 
    }
};