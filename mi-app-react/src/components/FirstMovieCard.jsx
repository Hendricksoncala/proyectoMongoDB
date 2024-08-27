import React from 'react';
import '../style/FirstMovieCard.css'; 
import { Link } from 'react-router-dom';

function FirstMovieCard({ movie }) {
  return (
    <div className='movie-card'>
      <Link to={`/pelicula/${movie._id}`} state={{ movie }}> {/* Pasando `movie` como estado */}
        <img src={movie.imagen} alt={movie.nombre} />
        <h2>{movie.nombre}</h2>
        <p>{movie.genero}</p>
      </Link>
    </div>
  );
}

export default FirstMovieCard;