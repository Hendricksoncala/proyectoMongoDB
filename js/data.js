import { connect } from "../helpers/connection.js"; // Asegúrate de que la ruta sea correcta
import { TicketManager } from "./module/tickets.js";
import { PeliculaManager } from "./module/pelicula.js";
import { AsientoManager } from "./module/asiento.js";
import { ClienteManager } from "./module/cliente.js";
import { ObjectId } from "mongodb";


const connection = new connect();
const db = await connection.conexion.db('movis');

const coleccionAsiento = await db.collection('asiento');
const coleccionTicket = await db.collection('ticket');
const coleccionSala = await db.collection('sala');
const coleccionCliente = await db.collection('cliente');
const coleccionFuncion = await db.collection('funcion');
const coleccionPelicula = await db.collection('pelicula')


/* 
*1. listado de peliculas
en este caso devuelve un string y no un objeto porque el objeto
no nos da la informacion que queremos ver completa
*/
export async function getAllMovie() {
    return await PeliculaManager.getAllMovie(); // Espera el resultado con await
}

/* 
*1.2 obtener detalles de pelicula

*/

export async function getMovie(){
    return await PeliculaManager.getMovie()
}

/**
 ** 2. API par comprar boletos:
 *Se esta creando el ticket, se esta permitiendo la compra de boletos 
 */
 export async function createTicket() {
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


// *2.2, verificar disponibilidad de los asientos
export async function obtenerInformacionSala(salaId) { 
  const asientoManager = new AsientoManager();
  return await asientoManager.getAll(salaId); 
}


// *3 reservar asientos
export async function reservarAsientos() {
    const funcionId = new ObjectId("66a6c2dce3cfd0b8c74fe5b8"); 
    const asientosIds = [
      new ObjectId("66a815847a512a9f93195882"), 
      new ObjectId("66a815847a512a9f93195887")  
    ]; 
  
    const asientoManager = new AsientoManager(); // Crear instancia de AsientoManager
    return await asientoManager.reservarAsientos(funcionId, asientosIds); // Llamar al método en la instancia
  }

// *3.2 cancelar reserva de asientos
export async function cancelarReservaAsientos() {
    const funcionId = new ObjectId("66a6c2dce3cfd0b8c74fe5b8"); // ID de la función
    const asientosIds = [
      new ObjectId("66a815847a512a9f93195884"), 

    ]; // IDs de los asientos a cancelar
  
    const asientoManager = new AsientoManager();
    await asientoManager.cancelarReserva(funcionId, asientosIds);
  }


/* 
*5 en adelante con todas las caracteristicas de roles definidos:

*/const newCliente = {
  nombre: "pablito tudisimo",
  email: "pabxx2@gmail.com",
  telefono: "+1 354 865 5555",
  tarjeta: false,
  tarjeta_id: null, 
  tipoUsuario: "estandar",
  password: "campus2023" // Reemplaza con una contraseña hasheada
};
  
  // Función para crear un cliente (API para Crear Usuario)
  export async function createCliente() {
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
  export async function getCliente(id) {
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
export async function updateCliente(id, updateData) {
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
  export async function getClientesByRol(rol) {
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
  export async function getAllClientes() {
    try {
      const clientes = await ClienteManager.getAll();
      console.log("Todos los clientes:", clientes);
      return clientes;
    } catch (error) {
      console.error("Error al obtener todos los clientes:", error);
      throw error;
    }
  }