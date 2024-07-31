import { connect } from "../helpers/connection.js"; // Asegúrate de que la ruta sea correcta
import { TicketManager } from "./module/tickets.js";
import { AsientoManager } from "./module/asiento.js"; // Importación corregida
import { PeliculaManager } from "./module/pelicula.js";
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
 export async function shopTicket() {
    
    const funcionId = new ObjectId("66a6c2dce3cfd0b8c74fe5b8");
    const clienteId = new ObjectId("66a7053d49b83a018940f87b");
    const asientoIds = [
        new ObjectId("66a815847a512a9f93195884"),
        new ObjectId("66a815847a512a9f93195885"),
        new ObjectId("66a815847a512a9f93195886")
    ];

    const fechaCompra = new Date("2024-07-28T10:30:00Z");
    const metodoPago = "Tarjeta";

    const ticketManager = new TicketManager();
    const ticket = await TicketManager.create(funcionId, clienteId, asientoIds, fechaCompra, metodoPago);

    console.log(ticket);
}


// *2.1, verificar disponibilidad de los asientos
export async function getSalaInfo() {
    AsientoManager.getSalaInfo()
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