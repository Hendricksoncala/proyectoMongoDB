import {
    connect
} from "../helpers/connection.js"

import {
    getAll as getMovie,
    get as getOneMovie

} from "./module/pelicula.js"

import {
    create as createTicket,
} from "./module/tickets.js"


import {
    getAll as getAsiento ,

} from "./module/asiento.js"

import {
    create as createUser,
    get as getUser,
    update as updateUser,
    getAll as getAllUser,
    getByRol as getUserByRol

}from "./module/cliente.js"

//  console.log (await getUser())
 console.log (await getUserByRol())