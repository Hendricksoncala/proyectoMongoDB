import React, { useState, useEffect } from 'react';
import axios from 'axios'; //
import SearchBar from '../SearchBar';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header'; 
import api from '../apiService'; 

function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);

  useEffect(() => {
    // Obtener películas en cartelera
    axios.get('http://localhost:3000/api/peliculas/en_cartelera') // Asegúrate de que la ruta sea correcta
      .then(response => {
        setNowPlayingMovies(response.data);
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
      {/* ... */}

      <h2>Películas en cartelera</h2>
      <div>
        {nowPlayingMovies.map(movie => (
          <MovieCard key={movie._id} movie={movie} /> 
        ))}
      </div>

      <h2>Próximamente</h2>
      <div>
        {comingSoonMovies.map(movie => (
          <MovieCard key={movie._id} movie={movie} /> 
        ))}
      </div>

      {/* ... */}
    </div>
  );

}
export default HomeScreen;