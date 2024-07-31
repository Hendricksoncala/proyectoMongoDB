import { connect } from "../../helpers/connection.js"
import { ObjectId } from "mongodb";
const conection = new connect 

import * as z from "zod";


const clienteSchema = z.object({
  nombre: z.string().min(1, { message: "El nombre es requerido" }),
  email: z.string().email({ message: "Correo electrónico inválido" }),
  telefono: z.string().min(1, { message: "El teléfono es requerido" }),
  tarjeta: z.boolean(),
  tarjeta_id: z.nullable(z.instanceof(ObjectId)), // Permite null si no tiene tarjeta
  tipoUsuario: z.enum(["estandar", "VIP", "administrador"])
});

export function validarCliente(datosCliente) {
  return clienteSchema.parse(datosCliente);
}