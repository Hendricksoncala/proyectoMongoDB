import { connect } from "../../helpers/connection.js";
import * as v from "./validaciones.js";
import { ObjectId } from "mongodb";



const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionSala = await db.collection('sala');
const coleccionAsiento = await db.collection('asiento');


//esta funcion encuentra los asientos de una sala y muestra la cantidad disponible
export async function getAll(
    {_id}
    =
    {_id: new ObjectId('66a6c202e3cfd0b8c74fe5a3')}){

    let sala = await coleccionSala.findOne({_id},{_id });
    console.log('Esta es la sala:')
    console.log(sala)

    let asientos = await coleccionAsiento.find({sala_id: _id}).toArray()
    console.log('Estos son los asientos ocupados:')
    console.log(asientos)

    console.log('los asientos disponibles son: ')
    let asientosDisponibles = sala.capacidad
    console.log(asientosDisponibles)
}


