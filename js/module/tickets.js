import { connect } from "../../helpers/connection.js";
import * as v from "./validaciones.js";
import { ObjectId } from "mongodb";

const connection = new connect();
const db = await connection.conexion.db('movis');
const coleccionAsiento = await db.collection('asiento');
const coleccionTicket = await db.collection('ticket');
const coleccionSala = await db.collection('sala');
const coleccionCliente = await db.collection('cliente');




export async function create(
    {
        funcion_id,
        cliente_id,
        asiento_id,
        precio_total,
        fecha_compra,
        metodo_pago,
        estado
    }
    =
    {
        funcion_id: new ObjectId("64c09e2c8b857f123456789a"), 
        cliente_id: new ObjectId("66a7053d49b83a018940f87b"), 
        asiento_id: [
          new ObjectId("66a6e0b0e3cfd0b8c74fe5e0"), 
          new ObjectId("64c09f3d8b857f123456789c")  
        ], 
        precio_total: 25.50,
        fecha_compra: new Date("2024-07-28T10:30:00Z"), 
        metodo_pago: "Tarjeta",
        estado: "activo" 
    }) {

        let cliente = await coleccionCliente.findOne({_id: cliente_id})
        console.log("El cliente registrado para la compra de este ticket es : ")
        console.log(cliente)
        
        // if(cliente.tipoUsuario !== 'administrador'){
        //     console.log("Este usuario no puede vender tickets")
        // }


        //aqui se valida que si el usuarios es vip se le aplicara el descuento---------------
        if(cliente.tipoUsuario === 'VIP' && cliente.tarjeta){
            if(getTarjeta()){
                console.log("Tienes descuento !")
                precio_total = precio_total - precio_total*0.10
            }else {
                return console.log('tarjeta no valida, intente denuevo.')
                
            }

        }

        //
        
    let create = await coleccionTicket.insertOne({
        funcion_id:funcion_id,
        cliente_id:cliente_id ,
        asiento_id: asiento_id,
        precio_total:precio_total,
        fecha_compra:fecha_compra,
        metodo_pago:metodo_pago,
        estado:estado
    });
    
    //esto es para controlar la capacidad de la sala y mostrar cuales asientos quedan disponibles cada asiento que se vaya guardando sera descontado

    
    if(create){
        let asientoId = asiento_id[0]
        console.log(asientoId)
        let asiento = await coleccionAsiento.find({_id: asientoId}).toArray();
        console.log(asiento)
        let sala = await coleccionSala.find({_id: asiento[0].sala_id}).toArray();
        console.log(sala)

        let salaCapacidad = await coleccionSala.updateOne({ _id: asiento[0].sala_id }, { $set: { capacidad: sala[0].capacidad - 1 } });
        return salaCapacidad;
    
    }
    //si la tarjeta es correcta se aplicara el descuento y mostrara el resultado:
    /*
    {
    acknowledged: true,
    modifiedCount: 1,
    upsertedId: null,
    upsertedCount: 0,
    matchedCount: 1
    }

    si no no dara descuento
    */ 
    
     function getTarjeta({tarjeta}={tarjeta: 123456789}){
        return cliente.tarjeta_id === tarjeta 
    }

}




