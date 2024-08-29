const Pelicula = require('../models/peliculaModel.cjs');
const Funcion = require('../models/funcionModel.cjs');
const { ObjectId } = require('mongodb'); 

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
      console.error('Error al obtener detalles de la película:', error);
      res.status(500).json({ error: error.message });
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


/**
 * Busca películas por nombre.
 *
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} res - El objeto de respuesta HTTP.
 * @returns {Promise<void>} Envía una respuesta JSON con la lista de películas encontradas o un mensaje de error en caso de fallo.
 */
exports.buscarPeliculasPorNombre = async (req, res) => {
    console.log(req.params)
    try {
        const nombre = req.params.nombre; // Obtén el nombre de la película de los parámetros de consulta

        // Validación básica (puedes agregar más validaciones si es necesario)
        if (!nombre) {
            return res.status(400).json({ error: 'El parámetro "nombre" es obligatorio' });
        }

        const peliculas = await Pelicula.getByName(nombre);

        // Si no se encontraron películas, envía un mensaje informativo
        if (peliculas.length === 0) {
            return res.status(200).json({ message: 'No se encontraron películas con ese nombre' });
        }

        // Mapear las películas a DTOs (si estás usando PeliculaDTO)
        const peliculasDTO = peliculas.map(pelicula => new PeliculaDTO(pelicula)); 
        res.status(200).json(peliculasDTO);
    } catch (error) {
        res.status(500).json({ error: 'Error interno del servidor al buscar películas' });
    }

};

exports.obtenerPeliculasEnCartelera = async (req, res) => {
    try {
    const fechaActual = new Date();

    const funciones = await Funcion.find({ // Llama al método find en el modelo Funcion
      "horario.fecha": { 
        $gte: fechaActual
        
      }

      
    });
    console.log(funciones);
        
    const peliculasIds = [...new Set(funciones.map(funcion => funcion.pelicula_id))];

    const peliculas = await Pelicula.find({ _id: { $in: peliculasIds } });


    res.json(peliculas);

    } catch (error) {
      console.error('Error al obtener películas en cartelera:', error); // Registrar detalles del error
      res.status(500).json({ error: 'Error al obtener películas en cartelera' });
    }
  };

  exports.obtenerPeliculasProximamente = async (req, res) => {
    try {
    const fechaActual = new Date();

    fechaActual.setDate(fechaActual.getDate() + 7);

    const funciones = await Funcion.find({ // Llama al método find en el modelo Funcion
      "horario.fecha": { 
        $gte: fechaActual
        
      }

      
    });
    console.log(funciones);
        
    const peliculasIds = [...new Set(funciones.map(funcion => funcion.pelicula_id))];

    const peliculas = await Pelicula.find({ _id: { $in: peliculasIds } });


    res.json(peliculas);

    } catch (error) {
      console.error('Error al obtener películas en cartelera:', error); // Registrar detalles del error
      res.status(500).json({ error: 'Error al obtener películas en cartelera' });
    }
  };
  exports.obtenerFuncionesDePelicula = async (req, res) => {
    try {
      const peliculaId = new ObjectId(req.params.id); // Obtén el ID de la película de la URL
  
      const funciones = await Funcion.find({ pelicula_id: peliculaId }); // Consulta las funciones por pelicula_id
  
      res.json(funciones);
    } catch (error) {
      console.error('Error al obtener funciones de la película:', error); 
      res.status(500).json({ error: 'Error al obtener funciones de la película' });
    }
  };

  exports.getById = async (id) => {
    try {
      const pelicula = await Pelicula.findById(id);
      if (!pelicula) {
        throw new Error('Película no encontrada');
      }
      return pelicula;
    } catch (error) {
      throw new Error(error.message);
    }
  };