import React from 'react';

function MovieCard({ movie }) {
  return (
    <div>
      <img src={movie.poster} alt={movie.title} /> {/* Asegúrate de tener la URL del póster en movie.poster */}
      <h2>{movie.title}</h2>
      <p>{movie.genres.join(', ')}</p> {/* Suponiendo que movie.genres es un array */}
      {/* Puedes agregar más detalles y un botón/enlace aquí */}
    </div>
  );
}

export default MovieCard;