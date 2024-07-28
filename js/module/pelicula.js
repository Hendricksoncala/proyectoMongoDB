import { connect } from "../../helpers/connection.js";
import * as v from "./validaciones.js";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionMovie = await db.collection('pelicula');
const coleccionFuncion = await db.collection('funcion');


export async function getAll() {
    let queryMovie = await coleccionMovie.find({}).toArray();

    for (let movie of queryMovie) {
        let funciones = await coleccionFuncion.find({ pelicula_id: movie._id }).toArray();
        let horario = funciones.map(funcion => ({
            fecha: funcion.horario.fecha,
            hora: funcion.horario.hora
        }));
        movie.funciones = horario;
    }

    //console.log(JSON.stringify(queryMovie, null, 2)); // Imprime el resultado de manera legible
    return JSON.stringify(queryMovie, null, 2);
}
/*
se esta buscando la pelicula apartir de un indicador:



*/ 

export async function get ({nombre}={ nombre: "Whiplash"  }){

    let query = await coleccionMovie.findOne({nombre},{nombre})
    console.log(query)
}