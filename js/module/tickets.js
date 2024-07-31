import { ObjectId } from "mongodb";
import { connect } from "../../helpers/connection.js";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionAsiento = db.collection('asiento');
const coleccionTicket = db.collection('ticket');
const coleccionSala = db.collection('sala');
const coleccionCliente = db.collection('cliente');
const coleccionFuncion = db.collection('funcion');


//
export class TicketManager {
    constructor() {} // El constructor no necesita argumentos
  
    static async create(funcionId, clienteId, asientoIds, fechaCompra, metodoPago) { 
      try {
        const cliente = await coleccionCliente.findOne({ _id: clienteId });
        console.log("El cliente registrado para la compra de este ticket es: ");
        console.log(cliente);
  
        const funcion = await coleccionFuncion.findOne({ _id: funcionId });
        if (!funcion) {
          throw new Error('La función no existe');
        }
  
        let precioTotal = 0;
        for (const asientoId of asientoIds) {
          const asiento = await coleccionAsiento.findOne({ _id: asientoId });
          const sala = await coleccionSala.findOne({ _id: asiento.sala_id });
          precioTotal += sala.precios[asiento.categoria];
        }
  
        if (cliente.tipoUsuario === 'VIP' && cliente.tarjeta) {
          if (this.getTarjeta(cliente)) {
            console.log("Tienes descuento !");
            precioTotal *= (1 - 0.10); // Aplicar el 10% de descuento
          } else {
            return console.log('Tarjeta no válida, intente de nuevo.');
          }
        }
  
        const resultadoTicket = await coleccionTicket.insertOne({
          funcion_id: funcionId,
          cliente_id: clienteId,
          asiento_id: asientoIds,
          precio_total: precioTotal,
          fecha_compra: fechaCompra,
          metodo_pago: metodoPago,
          estado: "activo"
        });
  
        console.log("Se ha agregado el ticket correctamente");
        return resultadoTicket;
      } catch (error) {
        console.error('Error al crear el ticket:', error);
        throw error;
      }
    }
  
    static getTarjeta(cliente) {
      return cliente.tarjeta_id === 123456789; // Verificar si el número de tarjeta coincide
    }
  }

//BUSCAR DISPONIBILIDAD DE SALA:

