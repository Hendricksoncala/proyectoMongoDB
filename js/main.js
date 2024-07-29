import {
    connect
} from "../helpers/connection.js"

import {
    getAll as getUser
} from "./module/usuario.js"

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

//  console.log (await getUser())
 console.log (await getAsiento())