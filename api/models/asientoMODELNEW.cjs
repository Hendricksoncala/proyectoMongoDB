const { ObjectId } = require("mongodb");
const connect = require("../helpers/connection.cjs"); // Asegúrate de que la ruta sea correcta
const mongoose = require('mongoose');

const connection = new connect();
const db = connection.conexion.db('movis');

const coleccionSala = db.collection('sala');
const coleccionAsiento = db.collection('asiento');
const coleccionFuncion = db.collection('funcion');

class AsientoManager {
    static instance;
    constructor() {
        // No necesitas un constructor específico si no hay datos predeterminados.
    }
    static async createMany(salaId, asientosSeleccionados) {
        try {
            // // Validar datos de entrada
            // if (!funcionId || !asientosSeleccionados || !Array.isArray(asientosSeleccionados) || asientosSeleccionados.length === 0) {
            //     throw new Error('Datos de reserva inválidos');
            // }
            function obtenerCategoriaDesdeNumero(seatNumber) {
                const fila = seatNumber.charAt(0);

                if (fila === 'A' || fila === 'B') {
                    return 'premium';
                } else {
                    return 'normal';
                }
            }

            // Crear los asientos reservados
            const asientosReservados = asientosSeleccionados.map(seatNumber => {
                const [fila, numeroStr] = seatNumber.split('');
                const numero = parseInt(numeroStr);
                const categoria = obtenerCategoriaDesdeNumero(seatNumber);
                return {
                    numero,
                    fila,
                    categoria,
                    sala_id: salaId, // <-SE NECESITA LA SALA ID
                    estado: 'reservado'
                };
            })
                ;
            console.log(asientosReservados)
            await coleccionAsiento.insertMany(asientosReservados)

            // const asientosReservadosIds = asientosReservados.map(asiento => asiento._id);

            // // Actualizar la función para agregar los asientos ocupados
            // const funcionActualizada = await Funcion.findByIdAndUpdate(funcionId, {
            //     $push: { asientos_ocupados: { $each: asientosReservadosIds } }
            // }, { new: true }); 

            // // Obtener los asientos ocupados actualizados de la función
            // const asientosOcupadosActualizados = funcionActualizada.asientos_ocupados;

            console.log("Asientos reservados correctamente");
            return {
                message: 'Asientos reservados correctamente',
                asientos: asientosReservados,
                asientosOcupados: asientosOcupadosActualizados
            };
        } catch (error) {
            console.error('Error al reservar asientos:', error);
            throw error;
        }
    }
}

module.exports = AsientoManager; 