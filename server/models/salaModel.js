const { ObjectId } = require("mongodb");
const connect = require("../helpers/connection.js");

const connection = new connect();
const db = connection.conexion.db('movis');
const coleccionSala = db.collection('sala');
const coleccionAsiento = db.collection('asiento');

class Sala {

    /**
     * Obtiene todas las salas de la base de datos.
     *
     * @returns {Promise<Array>} Una promesa que se resuelve con un array de salas.
     * @throws {Error} Si ocurre un error al obtener las salas.
     */
    static async getAll() {
        try {
            const salas = await coleccionSala.find({}).toArray();
            return salas;
        } catch (error) {
            console.error('Error al obtener todas las salas:', error);
            throw error; 
        }
    }

    /**
     * Obtiene una sala por su ID.
     *
     * @param {string} id - El ID de la sala a buscar.
     * @returns {Promise<Object|null>} Una promesa que se resuelve con la sala encontrada o null si no se encuentra.
     * @throws {Error} Si el ID de la sala es inválido o si ocurre un error al buscar la sala.
     */
    static async getById(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de sala inválido');
            }

            const sala = await coleccionSala.findOne({ _id: new ObjectId(id) });
            if (!sala) {
                throw new Error(`Sala con ID ${id} no encontrada`);
            }
            return sala;
        } catch (error) {
            console.error('Error al obtener la sala:', error);
            throw error; 
        }
    }

    /**
     * Crea una nueva sala en la base de datos.
     *
     * @param {Object} salaData - Los datos de la sala a crear.
     * @param {string} salaData.nombre - El nombre de la sala.
     * @param {number} salaData.capacidad - La capacidad total de la sala.
     * @param {Object} salaData.precios - Un objeto con los precios por categoría de asiento.
     * @param {string} salaData.tipo - El tipo de sala ("Normal", "3D", etc.).
     * @returns {Promise<ObjectId>} El ID de la sala creada.
     * @throws {Error} Si ocurre un error al crear la sala.
     */
    static async create(salaData) {
        try {
            // ... (Validaciones de salaData si es necesario)
            const result = await coleccionSala.insertOne(salaData);
            return result.insertedId; 
        } catch (error) {
            console.error('Error al crear la sala:', error);
            throw error; 
        }
    }

    /**
     * Actualiza los datos de una sala existente en la base de datos.
     *
     * @param {string} id - El ID de la sala a actualizar
     * @param {Object} salaData - Los datos actualizados de la sala
     * @param {string} [salaData.nombre] - El nuevo nombre de la sala (opcional).
     * @param {number} [salaData.capacidad] - La nueva capacidad total de la sala (opcional).
     * @param {Object} [salaData.precios] - Un nuevo objeto con los precios por categoría de asiento (opcional).
     * @param {string} [salaData.tipo] - El nuevo tipo de sala ("Normal", "3D", etc.) (opcional).
     * @returns {Promise<boolean>} `true` si la actualización fue exitosa, lanza un error en caso contrario
     * @throws {Error} Si la sala no se encuentra o si ocurre un error al actualizarla
     */
    static async update(id, salaData) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de sala inválido');
            }

            // ... (Validaciones de salaData si es necesario)
            const result = await coleccionSala.updateOne(
                { _id: new ObjectId(id) },
                { $set: salaData }
            );

            if (result.modifiedCount === 0) {
                throw new Error(`Sala con ID ${id} no encontrada`);
            }

            return true; 
        } catch (error) {
            console.error('Error al actualizar la sala:', error);
            throw error; 
        }
    }

    /**
     * Elimina una sala de la base de datos
     * 
     * @param {string} id - El ID de la sala a eliminar
     * @returns {Promise<boolean>} `true` si la eliminación fue exitosa, lanza un error en caso contrario
     * @throws {Error} Si la sala no se encuentra o si ocurre un error al eliminarla
     */
    static async delete(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de sala inválido');
            }

            const result = await coleccionSala.deleteOne({ _id: new ObjectId(id) });

            if (result.deletedCount === 0) {
                throw new Error(`Sala con ID ${id} no encontrada`);
            }

            return true; 
        } catch (error) {
            console.error('Error al eliminar la sala:', error);
            throw error; 
        }
    }
}

module.exports = Sala;