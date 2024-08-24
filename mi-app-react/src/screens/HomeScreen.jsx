import React, { useState, useEffect } from 'react';
import axios from 'axios'; //
import SearchBar from '../SearchBar';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header'; 
import api from '../apiService'
import MovieCarousel from '../components/MovieCarousel';


function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);

  useEffect(() => {
    // Obtener películas en cartelera
    axios.get('http://localhost:3000/api/peliculas/en_cartelera') // Asegúrate de que la ruta sea correcta
      .then(response => {
        setNowPlayingMovies(response.data);
        console.log('peliculas en cartelera')
      })
      .catch(error => {
        console.error('Error al obtener películas en cartelera:', error);
      });

    // Obtener películas próximamente
    axios.get('http://localhost:3000/api/peliculas/proximamente') // Asegúrate de que la ruta sea correcta
      .then(response => {
        setComingSoonMovies(response.data);
      })
      .catch(error => {
        console.error('Error al obtener películas próximamente:', error);
      });
  }, []); 

  return (
    <div>
      <Header /> {/* Agrega el componente Header */}
      <SearchBar />

      <section className="now-playing"> {/* Sección "Now Playing" */}
        <h2>Películas en cartelera</h2>
        <div className="movie-carousel"> {/* Contenedor para el carrusel */}
          <MovieCarousel movies={nowPlayingMovies} /> 
        </div>
        <a href="#" className="see-all">See all</a> {/* Enlace "See all" */}
      </section>

      <section className="coming-soon"> {/* Sección "Coming Soon" */}
        <h2>Próximamente</h2>
        <div className="movie-card"> {/* Contenedor para la tarjeta de película */}
          {comingSoonMovies.length > 0 && ( // Verifica si hay películas próximamente
            <MovieCard key={comingSoonMovies[0]._id} movie={comingSoonMovies[0]} />
          )}
        </div>
        <a href="#" className="see-all">See all</a> 
      </section>

      {/* ... (puedes agregar la barra de navegación inferior aquí) */}
    </div>
  );
}
export default HomeScreen;