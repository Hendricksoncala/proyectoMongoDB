import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../SecondPageCss/Header.css';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';


function SecondScreen() {
  const { id } = useParams(); // Extraer el ID de la URL
  const [movie, setMovie] = useState(null); // Estado para almacenar los datos de la película

  useEffect(() => {
    // Realizar una solicitud para obtener los datos de la película
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/peliculas/${id}`);
        setMovie(response.data); // Guardar los datos en el estado
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovie();
  }, [id]);

  // Mostrar un cargando o un mensaje si los datos no están disponibles
  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="second-screen">
      <header className="header">
        <Link to="/" className="back-button">⬅️</Link>
        <h1 className="title">Cinema Selection</h1>
        <div className="menu-button">☰</div>
      </header>

      <div className="movie-info">
        <img src={movie.imagen} alt={movie.nombre} className="movie-poster" />
        <div className="movie-details">
          <div className='left'>
            <h2>{movie.nombre}</h2>
            <p>{movie.genero}</p>
          </div>
          <div className='right'>
            <button className="trailer-button">🎬 Watch Trailer</button>
          </div>



        </div>
                  <p className="synopsis">{movie.sinopsis}</p>
      </div>

      <div className="cast-section">
        <h3>Cast</h3>
        <div className="cast-list">
          {movie.reparto.map((actor, index) => (
            <div key={index} className="cast-member">
              <img src='https://unavatar.io/{actor.nombre}' alt={actor.nombre} className="cast-image" />
              <p>{actor.nombre}</p>
              <p>{actor.personaje}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="cinemas-section">
        <h3>Cinema</h3>
        <div className="cinemas-list">
          <div className="cinema">
            <h4>Atrium Cinemas</h4>
            <p>Imax 3d, 2d, 4dx</p>
            <img src="https://unavatar.io/atrium" alt="Atrium Cinemas logo" className="cinema-logo" /> {/* Agrega la imagen */}

          </div>
          <div className="cinema">
            <h4>Neuplex</h4>
            <p>Imax 3d</p>
            <img src="https://unavatar.io/movis" alt="Neuplex logo" className="cinema-logo" /> {/* Agrega la imagen */}

          </div>
        </div>
      </div>

      <button className="buy-button">
        <Link to={`/funcion/${movie._id}`}>Book Now</Link> 
      </button>
    </div>
  );
}

export default SecondScreen;