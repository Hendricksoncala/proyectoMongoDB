const connect = require("./helpers/connection.js"); // Asegúrate de que la ruta sea correcta
const TicketManager = require("./module/tickets.js");
const PeliculaManager = require("./module/pelicula.js");
const AsientoManager = require("./module/asiento.js");
const ClienteManager = require("./module/cliente.js");
const { ObjectId } = require("mongodb"); 

const connection = new connect();
const db =  connection.conexion.db('movis');

const coleccionAsiento =  db.collection('asiento');
const coleccionTicket =  db.collection('ticket');
const coleccionSala =  db.collection('sala');
const coleccionCliente =  db.collection('cliente');
const coleccionFuncion =  db.collection('funcion');
const coleccionPelicula =  db.collection('pelicula')


/* 
*1. listado de peliculas
en este caso devuelve un string y no un objeto porque el objeto
no nos da la informacion que queremos ver completa
*/
 async function getAllMovie() {
    return await PeliculaManager.getAllMovie(); // Espera el resultado con await
}

/* 
*1.2 obtener detalles de pelicula

*/

 async function getMovie(){
    return await PeliculaManager.getMovie()
}

/**
 ** 2. API par comprar boletos:
 *Se esta creando el ticket, se esta permitiendo la compra de boletos 
 */
  async function createTicket() {
    try {
        const funcionId = new ObjectId("66a6c2dce3cfd0b8c74fe5b8");
        const clienteId = new ObjectId("66a7053d49b83a018940f87b");
        const asientoIds = [
            new ObjectId("66a815847a512a9f93195884"),
            new ObjectId("66a815847a512a9f93195885"),
            new ObjectId("66a815847a512a9f93195886")
        ];
        const fechaCompra = new Date("2024-07-28T10:30:00Z");
        const metodoPago = "Tarjeta";

        const ticket = await TicketManager.create(funcionId, clienteId, asientoIds, fechaCompra, metodoPago);
        console.log(ticket);
        return ticket;
    } catch (error) {
        console.error('Error al crear el ticket y reservar asientos:', error);
        throw error;
    }
}




/* 
*5 en adelante con todas las caracteristicas de roles definidos:

*/const newCliente = {
  nombre: "samuel sir",
  email: "davidelpapu@gmail.com",
  telefono: "+1 354 865 4444",
  tarjeta: false,
  tarjeta_id: null, 
  tipoUsuario: "VIP",
  password: "campus2023" // Reemplaza con una contraseña hasheada
};
  
  // Función para crear un cliente (API para Crear Usuario)
   async function createCliente() {
    try {
      const clienteCreado = await ClienteManager.create(newCliente);
      console.log("Cliente creado:", clienteCreado);
      return clienteCreado;
    } catch (error) {
      console.error("Error al crear cliente:", error);
      throw error;
    }
  }
  
  // Función para obtener un cliente por ID
   async function getCliente(id) {
    try {
      const cliente = await ClienteManager.get({ _id: id });
      console.log("Cliente obtenido:", cliente);
      return cliente;
    } catch (error) {
      console.error("Error al obtener cliente:", error);
      throw error;
    }
  }
  
// Función para actualizar un cliente (API para Actualizar Rol de Usuario)
 async function updateCliente(id, updateData) {
  try {
    // Validar que el id sea un ObjectId válido
    if (!ObjectId.isValid(id)) {
      throw new Error('ID de cliente inválido');
    }

    // Convertir tarjeta_id a ObjectId si es necesario
    if (updateData.tarjeta && updateData.tarjeta_id) {
      updateData.tarjeta_id = new ObjectId(updateData.tarjeta_id);
    } else if (updateData.tarjeta === false) {
      updateData.tarjeta_id = null;
    }

    // Realizar la actualización en la base de datos
    const resultado = await ClienteManager.update({ _id: id, ...updateData });

    // Verificar si se actualizó algún documento
    if (resultado.modifiedCount === 0) {
      throw new Error("No se encontró ningún cliente con ese ID");
    }

    console.log("Cliente actualizado:", resultado);
    return resultado;
  } catch (error) {
    console.error("Error al actualizar cliente:", error.message); // Mostrar el mensaje de error específico
    throw error;
  }
}
  
  // Función para obtener clientes por rol
   async function getClientesByRol(rol) {
    try {
      const clientes = await ClienteManager.getByRol({ tipoUsuario: rol });
      console.log("Clientes por rol:", clientes);
      return clientes;
    } catch (error) {
      console.error("Error al obtener clientes por rol:", error);
      throw error;
    }
  }
  
  // Función para obtener todos los clientes
   async function getAllClientes() {
    try {
      const clientes = await ClienteManager.getAll();
      console.log("Todos los clientes:", clientes);
      return clientes;
    } catch (error) {
      console.error("Error al obtener todos los clientes:", error);
      throw error;
    }
  }

module.exports = {getAllMovie,getMovie,createTicket,obtenerInformacionSala,reservarAsientos,cancelarReservaAsientos,createCliente,getCliente,updateCliente,getClientesByRol,getAllClientes}