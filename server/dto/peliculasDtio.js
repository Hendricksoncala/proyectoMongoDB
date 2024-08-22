class PeliculaDTO {
    constructor(pelicula) {
        this._id = pelicula._id;
        this.nombre = pelicula.nombre;
        this.genero = pelicula.genero;
        this.duracion = pelicula.duracion;
        this.sipnopsis = pelicula.sipnopsis;
        this.imagen = pelicula.imagen;
        this.trailer = pelicula.trailer;
        this.reparto = pelicula.reparto;

    }

    static peliculaEncontradaTemplate(pelicula) {
        return {
            status: 200,
            message: 'Pelicula encontrada exitosamente',
            data: new PeliculaDTO(pelicula)
        };
    }

    static peliculaCreadaTemplate(pelicula) {
        return {
            status: 201,
            message: 'Pelicula creada exitosamente',
            data: new PeliculaDTO(pelicula)
        };
    }

    static errorCrearPeliculaTemplate(){
        return {
            status:400,
            message: 'Error al crear pelicula',
            error: error.message
        };
    }

    static peliculaNoEncontradaTemplate(peliculaId) {
        return {
            status: 404,
            message: `Pelicula con ID ${peliculaId} no encontrada`
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

module.exports = PeliculaDTO;
    

