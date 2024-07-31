import { ObjectId } from "mongodb";
import { connect } from "../../helpers/connection.js";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionSala = await db.collection('sala');
const coleccionAsiento = await db.collection('asiento');
const coleccionFuncion = await db.collection('funcion');

export class AsientoManager {
    constructor() {
        // No necesitas un constructor específico aquí
    }

     async reservarAsientos(funcionId, asientosIds) { // Esta es la función principal
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
    } // Fin de la función reservarAsientos


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
                    asientos_ocupados: asientoId, // Verificar si el asiento está en la lista de ocupados
                });
                if (!funcion) {
                    // Si el asiento no está ocupado en la función, no es necesario hacer nada
                    console.log(`El asiento ${asientoId} no estaba reservado en esta función`);
                    continue;
                }

                // Actualizar el estado del asiento a "disponible"
                const resultadoActualizacion = await coleccionAsiento.updateOne(
                    { _id: asientoId, estado: "reservado" }, // Solo actualizar si está reservado
                    { $set: { estado: "disponible" } }
                );

                if (resultadoActualizacion.modifiedCount === 0) {
                    // El asiento no estaba en estado "reservado", lanzar un error o continuar
                    console.warn(`El asiento ${asientoId} no estaba en estado reservado`);
                    // Opcionalmente, puedes lanzar un error aquí si quieres detener la cancelación:
                    // throw new Error(`El asiento ${asientoId} no estaba en estado reservado`);
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
    

    static async getSalaInfo(salaId = new ObjectId('66a6c202e3cfd0b8c74fe5a3')) { 
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
