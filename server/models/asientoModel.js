const { ObjectId } = require( "mongodb");
const connect = require("../helpers/connection.js"); // Asegúrate de que la ruta sea correcta

const connection = new connect();
const db =  connection.conexion.db('movis');

const coleccionSala =  db.collection('sala');
const coleccionAsiento =  db.collection('asiento');
const coleccionFuncion =  db.collection('funcion');

 class AsientoManager {
    static instance;
    constructor() {
        // No necesitas un constructor específico aquí
    }

    /**
     * Reserva los asientos especificados para una función.
     *
     * @param {ObjectId} funcionId - El ID de la función para la que se reservarán los asientos.
     * @param {ObjectId[]} asientosIds - Un array de ObjectIds que representan los asientos a reservar.
     * @returns {Promise<boolean>} Una promesa que se resuelve con `true` si la reserva fue exitosa, o lanza un error en caso contrario.
     * @throws {Error} Si los datos de reserva son inválidos o si algún asiento no está disponible.
     */
    async reservarAsientos(funcionId, asientosIds) {
        try {
            // Validar datos de entrada
            if (!funcionId || !asientosIds || !Array.isArray(asientosIds) || asientosIds.length === 0) {
                throw new Error('Datos de reserva inválidos');
            }

            for (const asientoId of asientosIds) {
                // Verificar si el asiento está disponible en la función
                const funcion = await coleccionFuncion.findOne(
                    { _id: funcionId, asientos_ocupados: { $nin: [asientoId] } }
                );
                if (!funcion) {
                    throw new Error(`El asiento ${asientoId} no está disponible para reservar en esta función`);
                }

                // Verificar si el asiento está disponible en general
                const resultadoActualizacion = await coleccionAsiento.updateOne(
                    { _id: asientoId, estado: "disponible" }, 
                    { $set: { estado: "reservado" } }
                );
                if (resultadoActualizacion.modifiedCount === 0) {
                    throw new Error(`El asiento ${asientoId} no está disponible para reservar`);
                }

                // Agregar el asiento a la lista de asientos ocupados de la función
                await coleccionFuncion.updateOne(
                    { _id: funcionId },
                    { $addToSet: { asientos_ocupados: asientoId } } 
                );
            }

            console.log("Asientos reservados correctamente");
            return true;
        } catch (error) {
            console.error('Error al reservar asientos:', error);
            throw error;
        }
    } 

    /**
     * Cancela la reserva de los asientos especificados para una función.
     *
     * @param {ObjectId} funcionId - El ID de la función para la que se cancelarán las reservas.
     * @param {ObjectId[]} asientosIds - Un array de ObjectIds que representan los asientos a cancelar.
     * @returns {Promise<boolean>} Una promesa que se resuelve con `true` si la cancelación fue exitosa, o lanza un error en caso contrario.
     * @throws {Error} Si los datos de cancelación son inválidos o si algún asiento no está reservado.
     */
    async cancelarReserva(funcionId, asientosIds) {
        try {
            // Validar datos de entrada
            if (!funcionId || !asientosIds || !Array.isArray(asientosIds) || asientosIds.length === 0) {
                throw new Error('Datos de cancelación inválidos');
            }

            // Verificar si los asientos están reservados en la función y actualizar su estado
            for (const asientoId of asientosIds) {
                // Verificar si el asiento está reservado en la función
                const funcion = await coleccionFuncion.findOne({
                    _id: funcionId,
                    asientos_ocupados: asientoId, 
                });
                if (!funcion) {
                    // Si el asiento no está ocupado en la función, no es necesario hacer nada
                    console.log(`El asiento ${asientoId} no estaba reservado en esta función`);
                    continue;
                }

                // Actualizar el estado del asiento a "disponible"
                const resultadoActualizacion = await coleccionAsiento.updateOne(
                    { _id: asientoId, estado: "reservado" }, 
                    { $set: { estado: "disponible" } }
                );

                if (resultadoActualizacion.modifiedCount === 0) {
                    console.warn(`El asiento ${asientoId} no estaba en estado reservado`);
                }

                // Eliminar el asiento del array de asientos ocupados de la función
                await coleccionFuncion.updateOne(
                    { _id: funcionId },
                    { $pull: { asientos_ocupados: asientoId } }
                );
            }

            console.log("Reserva de asientos cancelada correctamente");
            return true;

        } catch (error) {
            console.error('Error al cancelar reserva de asientos:', error);
            throw error;
        }
    } 
    // fin de cancelar reserva 


    /**
     * Obtiene información sobre una sala, incluyendo detalles de la sala, cantidad de asientos ocupados/reservados y cantidad de asientos disponibles.
     *
     * @param {ObjectId} [salaId] - El ID de la sala. Por defecto, se utiliza el ID '66a6c202e3cfd0b8c74fe5a3'.
     * @returns {Promise<Object>} Un objeto con la información de la sala, incluyendo:
     *   - `sala`: El documento de la sala encontrada.
     *   - `asientosOcupados`: La cantidad de asientos ocupados o reservados en la sala.
     *   - `asientosDisponibles`: La cantidad de asientos disponibles en la sala.
     * @throws {Error} Si la sala no se encuentra o si ocurre un error al obtener la información.
     */
    async getAll(salaId = new ObjectId('66a6c202e3cfd0b8c74fe5a3')) { 
        try {
            const sala = await coleccionSala.findOne({ _id: salaId });
            if (!sala) {
                throw new Error(`Sala con ID ${salaId} no encontrada`);
            }

            const asientosOcupados = await coleccionAsiento.countDocuments({ 
                sala_id: salaId, 
                estado: { $in: ["ocupado", "reservado"] } 
            });
            const asientosDisponibles = sala.capacidad - asientosOcupados;

            console.log('Información de la sala:');
            console.log(sala);
            console.log('Asientos ocupados o reservados:', asientosOcupados);
            console.log('Asientos disponibles:', asientosDisponibles);

            return { sala, asientosOcupados, asientosDisponibles };

        } catch (error) {
            console.error('Error al obtener la información de la sala:', error);
            throw error; 
        }
    }
}


module.exports = AsientoManager; 