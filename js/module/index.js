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
    getAll as getTicket
} from "./module/tickets.js"

import {
    getAll as getAsiento
} from "./module/asiento.js"

import {
    create as createUser
} from "./module/cliente.js"


export {

    
    getUser,

    //movie
    getMovie,
    getOneMovie,

    //ticket
    createTicket,
    getTicket,

    getAsiento,
    getAll

} from "./index.js"


