class ClienteDTO {
    constructor(cliente) {
        this._id = cliente._id;
        this.nombre = cliente.nombre;
        this.email = cliente.email;
        this.tipoUsuario = cliente.tipoUsuario;
        this.tarjeta = cliente.tarjeta;
        this.telefono = cliente.telefono;
        
    }

    static clienteEncontradoTemplate(cliente) {
        return {
            status: 200,
            message: 'Cliente encontrado exitosamente',
            data: new ClienteDTO(cliente)
        };
    }

    static clienteCreadoTemplate(cliente) {
        return {
            status: 201,
            message: 'Cliente creado exitosamente',
            data: new ClienteDTO(cliente)
        };
    }

    static errorCrearClienteTemplate(){
        return {
            status:400,
            message: 'Error al crear cliente',
            error: error.message
        };
    }

    static clienteNoEncontradoTemplate(clienteId) {
        return {
            status: 404,
            message: `Cliente con ID ${clienteId} no encontrado`
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

module.exports = ClienteDTO;
    
