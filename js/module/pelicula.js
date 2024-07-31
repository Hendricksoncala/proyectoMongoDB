import { ObjectId } from "mongodb";
import { connect } from "../../helpers/connection.js";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionMovie = db.collection('pelicula');
const coleccionFuncion = db.collection('funcion');

export class PeliculaManager {
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

            return JSON.stringify(queryMovie, null, 2);
        } catch (error) {
            console.error('Error al obtener todas las películas:', error);
            throw error;
        }
    }

    static async getMovie({ nombre } = { nombre: "Whiplash" }) {
        try {
            let query = await coleccionMovie.findOne({ nombre }, { nombre });
            if (!query) {
                throw new Error(`Película con nombre ${nombre} no encontrada`);
            }
            // Eliminamos esta línea: console.log(query);
            return query;
        } catch (error) {
            console.error('Error al obtener la película:', error);
            throw error;
        }
    }
}
