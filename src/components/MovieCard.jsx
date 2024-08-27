import React from 'react';
import '../style/MovieCard.css'; 

function MovieCard({ movie }) {
  return (
    <div className='movie-card'>
      <img src={movie.imagen} alt={movie.nombre} />
      <h2>{movie.nombre}</h2>
      <p>Género: {movie.genero}</p>
      <p>Duración: {movie.duracion} minutos</p>
      <p>{movie.sinopsis}</p> 
      <a href={movie.trailer} target="_blank">Ver tráiler</a> {/* Enlace al tráiler */}
      {/* ... puedes mostrar información del reparto aquí si la tienes disponible */}
    </div>
  );
}

export default MovieCard;