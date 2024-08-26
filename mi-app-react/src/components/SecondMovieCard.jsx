import React from 'react';
import '../style/SecondMovieCard.css'; 

function SecondMovieCard({ movie }) {
    return (
      <div className='horizontal-movie-card'>
        <img src={movie.imagen} alt={movie.nombre} className='movie-image' />
        <div className='movie-info'>
          <h3>{movie.nombre}</h3>
          <p>{movie.genero}</p>
        </div>
      </div>
    );
  }

export default SecondMovieCard;