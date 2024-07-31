import {
    connect
} from "../helpers/connection.js"

import {
    getAll as getMovie,
    get as getOneMovie

} from "./module/pelicula.js"

import {
    create as createTicket,
    getAll as getTicket,
    cancelarReserva as cancelarReserva
} from "./module/tickets.js"

import {
    getAll as getAsiento,
    reservarAsientos as reservarAsientos
} from "./module/asiento.js"

import {
    create as createUser,
    get as getUser,
    update as updateUser,
    getAll as getAllUser,
    getByRol as getUserByRol
} from "./module/cliente.js"


export {

    //user
    createUser,
    getUser,
    updateUser,
    getAllUser,
    getUserByRol,

    //movie
    getMovie,
    getOneMovie,

    //ticket
    createTicket,
    getTicket,
    
    

    //asiento
    getAsiento,
    getAll,
    reservarAsientos

} from "./index.js"


