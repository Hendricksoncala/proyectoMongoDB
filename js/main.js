import { connect } from "../helpers/connection.js"; // Asegúrate de que la ruta sea correcta
import { TicketManager } from "./module/tickets.js";
import { PeliculaManager } from "./module/pelicula.js";
import { AsientoManager } from "./module/asiento.js";
import { shopTicket } from "./data.js";
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
// import { getAllMovie } from "./data.js";
// getAllMovie()
//   .then(info => console.log(info)) // Manejar la respuesta exitosa
//   .catch(console.error); // Manejar el error

/**
**1.2
 *Nos mostrara una detallada informacion de la pelicula  que busquemos por el nombre de esta
 */
// import { getMovie } from "./data.js";
// getMovie()
//   .then(info => console.log(info)) // Manejar la respuesta exitosa
//   .catch(console.error); // Manejar el error


/*
*2. compra de boletos
**API para Comprar Boletos:** Permitir la compra de boletos para una película específica, 
incluyendo la selección de la fecha y la hora de la proyección.
RESPUESTA:
{
  acknowledged: true,
  insertedId: new ObjectId('66a97b95652c5fe3591ed34e')
}
*/ 

// shopTicket().catch(console.error);


//*2.2 verificar disponibilidad de sala

// import { getSalaInfo } from "./data.js";
// getSalaInfo()
//   .then(info => console.log(info)) // Manejar la respuesta exitosa
//   .catch(console.error); // Manejar el error

/* 
*3 Reservar asientos
#Permitir la selección y reserva de asientos para una proyección específica.
# los asientos se guardan en asientos ocupados en la sala y la funcion que elija el cliente
*/

// import { reservarAsientos } from "./data.js";
// reservarAsientos()
//   .then(info => console.log(info)) // Manejar la respuesta exitosa
//   .catch(console.error); // Manejar el error


/* 
*3.2 cancelar reserva de asientos
#Permitir la cancelación de una reserva de asiento ya realizada.
*/
// import { cancelarReservaAsientos } from "./data.js";
// cancelarReservaAsientos()
//   .then(info => console.log(info)) // Manejar la respuesta exitosa
//   .catch(console.error); // Manejar el error

