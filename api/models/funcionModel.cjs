const { ObjectId } = require("mongodb");
const connect = require("../helpers/connection.cjs");

const connection = new connect();
const db = connection.conexion.db('movis');
const coleccionFuncion = db.collection('funcion');

class Funcion {

    /**
     * Obtiene todas las funciones de la base de datos.
     *
     * @returns {Promise<Array>} Una promesa que se resuelve con un array de funciones.
     * @throws {Error} Si ocurre un error al obtener las funciones.
     */
    static async getAll() {
        try {
            const funciones = await coleccionFuncion.find({}).toArray();
            return funciones;
        } catch (error) {
            console.error('Error al obtener todas las funciones:', error);
            throw error; 
        }
    }

    /**
     * Actualiza los asientos ocupados de una función por su ID.
     *
     * @param {string} id - El ID de la función a actualizar.
     * @param {Array<string>} asientosSeleccionados - Los asientos que se van a reservar.
     * @returns {Promise<Object>} El documento actualizado de la función.
     * @throws {Error} Si ocurre un error al actualizar los asientos.
     */
    static async updateAsientosOcupados(id, asientosSeleccionados) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de función inválido');
            }

            const result = await coleccionFuncion.updateOne(
                { _id: new ObjectId(id) },
                {
                    $addToSet: { asientos_ocupados: { $each: asientosSeleccionados } }
                }
            );

            if (result.modifiedCount === 0) {
                throw new Error(`No se pudo actualizar la función con ID ${id}`);
            }

            // Retorna el documento actualizado
            const funcionActualizada = await Funcion.findById(id);
            return funcionActualizada;
        } catch (error) {
            console.error('Error al actualizar los asientos ocupados:', error);
            throw error;
        }
    }



    /**
     * Obtiene una función por su ID.
     *
     * @param {string} id - El ID de la función a buscar.
     * @returns {Promise<Object|null>} Una promesa que se resuelve con la función encontrada o null si no se encuentra.
     * @throws {Error} Si el ID de la función es inválido o si ocurre un error al buscar la función.
     */
    static async findById(id) {
        try {
            if (!ObjectId.isValid(id)) {
                throw new Error('ID de función inválido');
            }
    
            const funcion = await coleccionFuncion.findOne({ _id: new ObjectId(id) });
            if (!funcion) {
                throw new Error(`Función con ID ${id} no encontrada`);
            }
            return funcion;
        } catch (error) {
            console.error('Error al obtener la función:', error);
            throw error; 
        }
    }

    // /**
    //  * 
    //  * @param {string} nombre  - El nombre de la p
    //  * @returns 
    //  */
    // static async getByName(nombre) {
    //     try{
    //         const funcion = await coleccionFuncion.findOne({ nombre });
    //         if (!funcion) {
    //             throw new Error(`Función con nombre ${nombre} no encontrada`);
    //         }
    //         return funcion
    //     } catch (error) {
    //         console.error('Error al obtener la función:', error);
    //         throw error;
    //     }
    // }

    /**
     * Crea una nueva función en la base de datos.
     *
     * @param {Object} funcionData - Los datos de la función a crear.
     * @param {ObjectId} funcionData.peliculaId - El ID de la película asociada a la función.
     * @param {ObjectId} funcionData.salaId - El ID de la sala donde se proyectará la función.
     * @param {Date} funcionData.fecha - La fecha de la función.
     * @param {string} funcionData.hora - La hora de la función en formato HH:mm.
     * @param {number} funcionData.precio - El precio base del ticket para la función.
     * @returns {Promise<ObjectId>} El ID de la función creada.
     * @throws {Error} Si ocurre un error al crear la función.
     */
    static async create(funcionData) {
        try {
            // ... (Validaciones de funcionData si es necesario)

            // Asegúrate de que peliculaId y salaId sean ObjectIds válidos
            funcionData.peliculaId = new ObjectId(funcionData.peliculaId);
            funcionData.salaId = new ObjectId(funcionData.salaId);

            // Estructura el campo 'horario' como un objeto
            funcionData.horario = {
                fecha: funcionData.fecha, 
                hora: funcionData.hora
            };

            // Inicializa el array 'asientos_ocupados' como un array vacío
            funcionData.asientos_ocupados = [];

            const result = await coleccionFuncion.insertOne(funcionData);
            return result.insertedId; 
        } catch (error) {
            console.error('Error al crear la función:', error);
            throw error; 
        }
    }

    static async find(query) {
        try {
          const funciones = await coleccionFuncion.find(query).toArray();
          console.log(funciones)
          return funciones; 
        } catch (error) {
          throw new Error('Error al buscar funciones en la base de datos'); 
        }
      }

    // ... (Otros métodos para actualizar y eliminar funciones)
}

module.exports = Funcion;