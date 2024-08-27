class TicketDTO{
    constructor(ticket){
        this._id = ticket._id;
        this.funcion = ticket.funcion_id;
        this.cliente = ticket.cliente_id;
        this.asientos = ticket.asiento_id;
        this.fechaCompra = ticket.fecha_compra;
        this.metodoPago = ticket.metodo_pago;
    }

    static ticketEncontradoTemplate(ticket){
        return {
            status: 200,
            message: 'Ticket encontrado exitosamente',
            data: new TicketDTO(ticket)
        };
    }

    static ticketCreadoTemplate(ticket){
        return {
            status: 201,
            message: 'Ticket creado exitosamente',
            data: new TicketDTO(ticket)
        };
    }

    static errorCrearTicketTemplate(){
        return {
            status:400,
            message: 'Error al crear ticket',
            error: error.message
        };
    }
    
    static ticketNoEncontradoTemplate(ticketId) {
        return {
            status: 404,
            message: `Ticket con ID ${ticketId} no encontrado`
        };
    }
    
    static errorInternoTemplate() {
        return {
            status: 500,
            message: 'Error interno del servidor',
            error: error.message
        };
    }
}

module.exports = TicketDTO;
    
