const Pelicula = require('../models/peliculaModel'); // Asegúrate de que la ruta sea correcta

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