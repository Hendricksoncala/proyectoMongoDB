import { ObjectId } from "mongodb";
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
//obtener usuario
export async function get(
    {
        _id
    }
    =
    {
        _id: new ObjectId('66a7053d49b83a018940f87b')
    }
){
    let usuario = await coleccionCliente.findOne(_id)
    return usuario
    
}
//actualizar usuario
export async function update(
    {
        _id,
        tipoUsuario
    }
    =
    {
        _id: new ObjectId('66a7053d49b83a018940f87b'),
        tipoUsuario: 'VIP'
    }
){
    let usuario = await coleccionCliente.updateOne(
        {_id: _id},
        {$set: {tipoUsuario: tipoUsuario}}
    )

    return usuario
}


//filtrar por rol
export async function getByRol ({tipoUsuario}={tipoUsuario : 'estandar'}){
    let usuario = await coleccionCliente.find({tipoUsuario}).toArray()
    console.log('usuarios filtrados: ')
    return usuario
}

//vamos a obtener todos 
export async function getAll () {
    let usuario = await coleccionCliente.find({}).toArray()
    console.log('Todos los usuarios: ')
    return usuario
}