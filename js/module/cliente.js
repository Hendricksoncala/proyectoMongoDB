import { connect } from "../../helpers/connection.js";
import * as v from "./validaciones.js";

const connection = new connect();
const db = await connection.conexion.db('movis');

const coleccionCliente = await db.collection('cliente');


//aqui se pueden crear roles especificos  como admin, vip y estandar 
export async function create(
    {
    nombre,
    email,
    telefono,
    tarjeta,
    tarjeta_id,
    tipoUsuario
    }
    =
    {
    nombre: "Carlos Mendoza",
    email: "carlos.mendoza@example.com",
    telefono: "+57 300 123 4567", 
    tarjeta: true,
    tarjeta_id: 123456789, // Reemplaza con un ObjectId válido si el cliente tiene tarjeta
    tipoUsuario: "VIP"
    }

) {
    let create =  await coleccionCliente.insertOne({
        nombre:nombre,
        email:email,
        telefono:telefono,
        tarjeta:tarjeta,
        tarjeta_id:tarjeta_id,
        tipoUsuario:tipoUsuario
    });

    

}
