import { ObjectId } from "mongodb";
import { connect } from "../../helpers/connection.js";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionCliente = db.collection('cliente');

export class ClienteManager {
    constructor() {
        // No necesitas un constructor específico si no hay datos predeterminados.
    }

    static async create({ 
        nombre, 
        email, 
        telefono, 
        tarjeta, 
        tarjeta_id, 
        tipoUsuario 
    }) {
        try {
            const newCliente = {
                nombre,
                email,
                telefono,
                tarjeta,
                tarjeta_id,
                tipoUsuario
            };

            let create = await coleccionCliente.insertOne(newCliente);

            return create;
        } catch (error) {
            console.error('Error al crear el cliente:', error);
            throw error;
        }
    }

    static async get({ _id }) {
        try {
            let usuario = await coleccionCliente.findOne({ _id: new ObjectId(_id) });
            if (!usuario) {
                throw new Error(`Cliente con ID ${_id} no encontrado`);
            }
            return usuario;
        } catch (error) {
            console.error('Error al obtener el cliente:', error);
            throw error;
        }
    }

    static async update({ 
        _id, 
        nombre, 
        email, 
        telefono, 
        tarjeta, 
        tarjeta_id, 
        tipoUsuario 
    }) {
        try {
            const updateData = {};
            if (nombre) updateData.nombre = nombre;
            if (email) updateData.email = email;
            if (telefono) updateData.telefono = telefono;
            if (tarjeta !== undefined) updateData.tarjeta = tarjeta;

            // Lógica para actualizar tarjeta_id
            if (tarjeta !== undefined) {
                updateData.tarjeta_id = tarjeta ? tarjeta_id : null;
            } else if (tarjeta_id) { // Si solo se proporcionó tarjeta_id
                updateData.tarjeta_id = tarjeta_id;
            }

            if (tipoUsuario) updateData.tipoUsuario = tipoUsuario;

            let usuario = await coleccionCliente.updateOne(
                { _id: new ObjectId(_id) },
                { $set: updateData }
            );
            return usuario;
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
            throw error;
        }
    }

    static async getByRol({ tipoUsuario } = { tipoUsuario: 'estandar' }) {
        try {
            let usuario = await coleccionCliente.find({ tipoUsuario }).toArray();
            console.log('Usuarios filtrados por rol:');
            console.log(usuario);
            return usuario;
        } catch (error) {
            console.error('Error al obtener usuarios por rol:', error);
            throw error;
        }
    }

    static async getAll() {
        try {
            let usuario = await coleccionCliente.find({}).toArray();
            console.log('Todos los usuarios:');
            console.log(usuario);
            return usuario;
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            throw error;
        }
    }
}