import { connect } from "../../helpers/connection.js"
import * as v from "./validaciones.js"

const conection = new connect();
const db = await conection.conexion.db('movis')

export async function getAll(){

    let coleccion = await db.collection('cliente')
    let query = await coleccion.find({}).toArray()



    console.table(query)
}