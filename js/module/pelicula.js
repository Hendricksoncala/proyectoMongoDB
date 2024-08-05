import { ObjectId } from "mongodb";
import { connect } from "../../helpers/connection.js";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionMovie = db.collection('pelicula');
const coleccionFuncion = db.collection('funcion');
export class PeliculaManager {

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
    static async getAllMovie() {
        try {
            let queryMovie = await coleccionMovie.find({}).toArray();

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
     * Obtiene los detalles de una película específica por su nombre.
     *
     * @param {Object} params - Parámetros de la consulta.
     * @param {string} params.nombre - El nombre de la película a buscar.
     * @returns {Promise<Object|null>} El documento de la película encontrada o null si no se encuentra.
     * @throws {Error} Si la película no se encuentra o si ocurre un error al buscarla.
     */
    static async getMovie({ nombre } = { nombre: "Whiplash" }) {
        try {
            let query = await coleccionMovie.findOne({ nombre }, { nombre });
            if (!query) {
                throw new Error(`Película con nombre ${nombre} no encontrada`);
            }
            return query;
        } catch (error) {
            console.error('Error al obtener la película:', error);
            throw error;
        }
    }
}
