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

//  console.log (await getUser())
 console.log (await getMovie())