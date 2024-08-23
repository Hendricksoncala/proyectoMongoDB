const { ObjectId } = require("mongodb");
const connect = require("../helpers/connection.js");

const connection = new connect();
const db =  connection.conexion.db('movis');
const coleccionPelicula = db.collection('pelicula');
const coleccionFuncion = db.collection('funcion');


class Pelicula {

    /**
     * Obtiene todas las películas disponibles en el catálogo, incluyendo sus horarios de proyección.
     *
     * @returns {Promise<Array>} Un array de objetos que representan las películas, cada uno con los siguientes campos:
     *   - `_id`: El ObjectId de la película.
     *   - `nombre`: El nombre de la película.
     *   - `genero`: El género de la película.
     *   - `duracion`: La duración de la película en minutos.
     *   - `sinopsis`: La sinopsis de la película (opcional).
     *   - `funciones`: Un array de objetos que representan los horarios de proyección de la película, cada uno con los siguientes campos:
     *     - `fecha`: La fecha de la función en formato ISO.
     *     - `hora`: La hora de la función en formato HH:mm.
     * @throws {Error} Si ocurre un error al obtener las películas o sus funciones.
     */
    static async getAll() {
        try {
            let queryMovie = await coleccionPelicula.find({}).toArray();

            for (let movie of queryMovie) {
                let funciones = await coleccionFuncion.find({ pelicula_id: movie._id }).toArray();
                let horario = funciones.map(funcion => ({
                    fecha: funcion.horario.fecha,
                    hora: funcion.horario.hora
                }));
                movie.funciones = horario;
            }

            return queryMovie; 
        } catch (error) {
            console.error('Error al obtener todas las películas:', error);
            throw error;
        }
    }

    /**
     * Obtiene los detalles de una película específica por su ID.
     *
     * @param {string} id - El ID de la película a buscar.
     * @returns {Promise<Object|null>} El documento de la película encontrada o null si no se encuentra.
     * @throws {Error} Si la película no se encuentra o si ocurre un error al buscarla.
     */
    static async getById(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de película inválido');
            }

            const pelicula = await coleccionPelicula.findOne({ _id: new ObjectId(id) });
            if (!pelicula) {
                throw new Error(`Película con ID ${id} no encontrada`);
            }
            return pelicula;
        } catch (error) {
            console.error('Error al obtener la película:', error);
            throw error;
        }
    }

    /**
     * Obtiene los detalles de una película específica por su nombre.
     *
     * @param {string} nombre - El nombre de la película a buscar
     * @returns {Promise<Object|null>} El documento de la película encontrada o null si no se encuentra.
     * @throws {Error} Si la película no se encuentra o si ocurre un error al buscarla.
     */
    static async getByName(nombre) {
        try {
            console.log('Buscando película por nombre:', nombre); 
            const pelicula = await coleccionPelicula.findOne({ nombre });
            console.log('Película encontrada:', pelicula); 
            if (!pelicula) {
                throw new Error(`Película con nombre ${nombre} no encontrada`);
            }
            return pelicula;
        } catch (error) {
            console.error('Error al obtener la película:', error);
            throw error;
        }
    }

    /**
     * Crea una nueva película en la base de datos.
     *
     * @param {Object} peliculaData - Los datos de la película a crear.
     * @param {string} peliculaData.nombre - El nombre de la película.
     * @param {string} peliculaData.genero - El género de la película.
     * @param {number} peliculaData.duracion - La duración de la película en minutos.
     * @param {string} [peliculaData.sinopsis] - La sinopsis de la película (opcional).
     * @param {string} [peliculaData.imagen] - La URL o ruta de la imagen de la película (opcional).
     * @param {string} [peliculaData.trailer] - La URL del tráiler de la película (opcional).
     * @param {Array} [peliculaData.reparto] - Un array con los actores y sus personajes (opcional).
     * @returns {Promise<ObjectId>} El ID de la película creada.
     * @throws {Error} Si ocurre un error al crear la película.
     */
    static async create(peliculaData) {
        try {
            // ... (Validaciones de peliculaData si es necesario)
            const result = await coleccionPelicula.insertOne(peliculaData);
            return result.insertedId; 
        } catch (error) {
            console.error('Error al crear la película:', error);
            throw error; 
        }
    }

    /**
     * Actualiza los datos de una película existente en la base de datos.
     *
     * @param {string} id - El ID de la película a actualizar
     * @param {Object} peliculaData - Los datos actualizados de la película
     * @param {string} [peliculaData.nombre] - El nuevo nombre de la película (opcional).
     * @param {string} [peliculaData.genero] - El nuevo género de la película (opcional).
     * @param {number} [peliculaData.duracion] - La nueva duración de la película en minutos (opcional).
     * @param {string} [peliculaData.sinopsis] - La nueva sinopsis de la película (opcional).
     * @param {string} [peliculaData.imagen] - La nueva URL o ruta de la imagen de la película (opcional).
     * @param {string} [peliculaData.trailer] - La nueva URL del tráiler de la película (opcional).
     * @param {Array} [peliculaData.reparto] - Un nuevo array con los actores y sus personajes (opcional).
     * @returns {Promise<boolean>} `true` si la actualización fue exitosa, lanza un error en caso contrario
     * @throws {Error} Si la película no se encuentra o si ocurre un error al actualizarla
     */
    static async update(id, peliculaData) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de película inválido');
            }

            // ... (Validaciones de peliculaData si es necesario)
            const result = await coleccionPelicula.updateOne(
                { _id: new ObjectId(id) },
                { $set: peliculaData }
            );

            if (result.modifiedCount === 0) {
                throw new Error(`Película con ID ${id} no encontrada`);
            }

            return true; 
        } catch (error) {
            console.error('Error al actualizar la película:', error);
            throw error; 
        }
    }

    /**
     * Elimina una película de la base de datos
     * 
     * @param {string} id - El ID de la película a eliminar
     * @returns {Promise<boolean>} `true` si la eliminación fue exitosa, lanza un error en caso contrario
     * @throws {Error} Si la película no se encuentra o si ocurre un error al eliminarla
     */
    static async delete(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de película inválido');
            }

            const result = await coleccionPelicula.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                throw new Error(`Película con ID ${id} no encontrada`);
            }

            return true; 
        } catch (error) {
            console.error('Error al eliminar la película:', error);
            throw error; 
        }
    }

    

}

module.exports = Pelicula;