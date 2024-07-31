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
