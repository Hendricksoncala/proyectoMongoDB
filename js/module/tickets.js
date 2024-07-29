import { connect } from "../../helpers/connection.js";
import * as v from "./validaciones.js";
import { ObjectId } from "mongodb";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionAsiento = await db.collection('asiento');
const coleccionTicket = await db.collection('ticket');
const coleccionSala = await db.collection('sala');



export async function create(
    {
        funcion_id,
        cliente_id,
        asiento_id,
        precio_total,
        fecha_compra,
        metodo_pago,
        estado
    }
    =
    {
        funcion_id: new ObjectId("64c09e2c8b857f123456789a"), 
        cliente_id: new ObjectId("64c09b148b857f1234567880"), 
        asiento_id: [
          new ObjectId("66a6e0b0e3cfd0b8c74fe5e0"), 
          new ObjectId("64c09f3d8b857f123456789c")  
        ], 
        precio_total: 25.50,
        fecha_compra: new Date("2024-07-28T10:30:00Z"), 
        metodo_pago: "Tarjeta",
        estado: "activo" 
    }) {
 
    let create = await coleccionTicket.insertOne({
        funcion_id:funcion_id,
        cliente_id:cliente_id ,
        asiento_id: asiento_id,
        precio_total:precio_total,
        fecha_compra:fecha_compra,
        metodo_pago:metodo_pago,
        estado:estado
    });
    
    
    if(create){
        let asientoId = asiento_id[0]
        console.log(asientoId)
        let asiento = await coleccionAsiento.find({_id: asientoId}).toArray();
        console.log(asiento)
        let sala = await coleccionSala.find({_id: asiento[0].sala_id}).toArray();
        console.log(sala)

        let salaCapacidad = await coleccionSala.updateOne({ _id: asiento[0].sala_id }, { $set: { capacidad: sala[0].capacidad - 1 } });
        return salaCapacidad;
    
    }



}


