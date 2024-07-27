import {
    connect
} from "../helpers/connection.js"

import {
    getAll
} from "./module/usuario.js"

 console.log (await getAll())