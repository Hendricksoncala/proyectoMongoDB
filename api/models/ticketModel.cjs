const { ObjectId } = require( "mongodb");
const connect = require("../helpers/connection.cjs");

const connection = new connect();
const db =  connection.conexion.db('movis');
const coleccionAsiento = db.collection('asiento');
const coleccionTicket = db.collection('ticket');
const coleccionSala = db.collection('sala');
const coleccionCliente = db.collection('cliente');
const coleccionFuncion = db.collection('funcion');


//
 class TicketManager {
  static instance;
  constructor() {} // El constructor no necesita argumentos

  /**
   * Crea un nuevo ticket en la base de datos.
   *
   * @param {ObjectId} funcionId - El ID de la función para la que se compra el ticket.
   * @param {ObjectId} clienteId - El ID del cliente que compra el ticket.
   * @param {ObjectId[]} asientoIds - Un array de ObjectIds que representan los asientos comprados.
   * @param {Date} fechaCompra - La fecha y hora de la compra del ticket.
   * @param {string} metodoPago - El método de pago utilizado ("Tarjeta", "Efectivo", etc.).
   * @param {string} [estado="activo"] - El estado inicial del ticket (por defecto, "activo").
   * @returns {Promise<InsertOneResult>} Una promesa que se resuelve con el resultado de la inserción del ticket en la base de datos.
   * @throws {Error} Si la función no existe, si algún asiento no está disponible, si el cliente es un administrador, o si hay un error al crear el ticket.
   */
  static async create(funcionId, clienteId, asientoIds, fechaCompra, metodoPago, estado = "activo") { 
    try {
      const cliente = await coleccionCliente.findOne({ _id: clienteId });
      console.log("El cliente registrado para la compra de este ticket es: ");
      console.log(cliente);

      // Validación de administrador (puedes descomentar si es necesario)
      // if(cliente.tipoUsuario !== 'administrador'){
      //     throw new Error("Este usuario no puede vender tickets")
      // }

      // Verificar disponibilidad de asientos y calcular precio total
      const funcion = await coleccionFuncion.findOne({ _id: funcionId });
      if (!funcion) {
        throw new Error('La función no existe');
      }

      let precioTotal = 0;
      for (const asientoId of asientoIds) {
        if (funcion.asientos_ocupados && funcion.asientos_ocupados.includes(asientoId)) {
          throw new Error(`El asiento ${asientoId} no está disponible`);
        }

        // Obtener el precio del asiento
        const asiento = await coleccionAsiento.findOne({ _id: asientoId });
        const sala = await coleccionSala.findOne({ _id: asiento.sala_id });
        precioTotal += sala.precios[asiento.categoria];
      }

      // Aplicar descuento si es VIP y la tarjeta es válida
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
    /**
   * Obtiene un ticket por su ID.
   *
   * @param {string} id - El ID del ticket a buscar.
   * @returns {Promise<Object|null>} Una promesa que se resuelve con el ticket encontrado o null si no se encuentra.
   * @throws {Error} Si el ID del ticket es inválido o si ocurre un error al buscar el ticket.
   */
    static async getById(id) {
      try {
        if (!ObjectId.isValid(id)) {
          throw new Error('ID de ticket inválido');
        }
  
        const ticket = await coleccionTicket.findOne({ _id: new ObjectId(id) });
        if (!ticket) {
          throw new Error(`Ticket con ID ${id} no encontrado`);
        }
        return ticket;
      } catch (error) {
        console.error('Error al obtener el ticket:', error);
        throw error; 
      }
    }

  /**
   * Verifica si el cliente tiene una tarjeta VIP válida con el número especificado.
   *
   * @param {Object} cliente - El objeto del cliente.
   * @returns {boolean} `true` si el cliente tiene una tarjeta VIP válida con el número 123456789, `false` en caso contrario.
   */
  static getTarjeta(cliente) {
    return cliente.tarjeta_id === 123456789;
  }
}
//BUSCAR DISPONIBILIDAD DE SALA:

module.exports = TicketManager; 