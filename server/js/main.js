const connect = require("../helpers/connection.js"); // Asegúrate de que la ruta sea correcta
const TicketManager = require("./module/tickets.js");
const PeliculaManager = require("./module/pelicula.js");
const AsientoManager = require("./module/asiento.js");
const ClienteManager = require("./module/cliente.js");
const { ObjectId } = require("mongodb"); 

const {getAllMovie,getMovie,createTicket,obtenerInformacionSala,reservarAsientos,cancelarReservaAsientos,createCliente,getCliente,updateCliente,getClientesByRol,getAllClientes} = require("./data.js")

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

// // Crear un ticket
// import { createTicket } from "./data.js";
// console.log("\n--- Crear un ticket ---");
// createTicket()
//   .then(info => console.log(info))
//   .catch(console.error);


//*2.2 verificar disponibilidad de sala

// const salaId = new ObjectId("66a6c202e3cfd0b8c74fe5a3"); 
// import { obtenerInformacionSala } from "./data.js";
// obtenerInformacionSala(salaId)
//   .then(info => console.log(info)) 
//   .catch(console.error); 
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




/* 
*5. Roles definidos 
*/


// // Crear un cliente
// console.log("\n--- Crear un cliente ---");
// createCliente()
//   .then(info => console.log(info))
//   .catch(console.error);

// // Obtener un cliente por ID
// console.log("\n--- Obtener un cliente ---");
// getCliente('66a70580acf16585a55981f0') // Reemplaza 'ID_DEL_CLIENTE' por el ID real del cliente
//   .then(info => console.log(info))
//   .catch(console.error);

// // Actualizar un cliente
// console.log("\n--- Actualizar un cliente ---");
// updateCliente('66a72297e3cfd0b8c74fe5f4', { nombre: 'Marta Gimenez' }) // Reemplaza 'ID_DEL_CLIENTE' por el ID real del cliente y proporciona los datos de actualización
//   .then(info => console.log(info))
//   .catch(console.error);

// // Obtener clientes por rol
// console.log("\n--- Obtener clientes por rol ---");
// getClientesByRol('estandar')
//   .then(info => console.log(info))
//   .catch(console.error);

// // Obtener todos los clientes
// console.log("\n--- Obtener todos los clientes ---");
// getAllClientes()
//   .then(info => console.log(info))
//   .catch(console.error);



// /**
// *CREACION DE USERS, ADMIN
//  */
// import UserManager from '../db/userManager.js';  

// async function main() {  
//   const userManager = new UserManager();  

//   await userManager.connect();  

//   // Crear usuario admin  
  
//   // await userManager.createAdmin('Karen', 'campus2023');  

//   // Crear usuario lector  

//   await userManager.createReader('usuarioBasico', '12345');  

//   await userManager.close();  
// }  

// // Ejecutar el script  
// main().catch(console.error);  