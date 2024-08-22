class AsientoDTO {
    constructor(asiento) {
        this._id = asiento._id; 
        this.numero = asiento.numero;
        this.fila = asiento.fila;
        this.columna = asiento.columna;
        this.estado = asiento.estado;
        this.salaId = asiento.sala_id; 
        this.categoria = asiento.categoria; 
    }

    static multipleAsientosTemplate(asientos) {
        return {
            status: 200,
            message: "Asientos encontrados exitosamente",
            data: asientos.map(asiento => new AsientoDTO(asiento)) // Mapear cada asiento a un DTO
        };
    }

    static asientoNoEncontradoTemplate(asientoId) {
        return {
            status: 404,
            message: `Asiento con ID ${asientoId} no encontrado`
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

module.exports = AsientoDTO;