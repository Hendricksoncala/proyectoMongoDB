import React from 'react';
import '../style/FirstMovieCard.css'; 

function FirstMovieCard({ movie }) {
  return (
    <div className='movie-card'>
      <img src={movie.imagen} alt={movie.nombre} />
      <h2>{movie.nombre}</h2>
      <p>{movie.genero}</p> 
    </div>
  );
}

export default FirstMovieCard;