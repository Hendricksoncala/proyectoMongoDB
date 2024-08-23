import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MovieCard from './MovieCard';
import api from './apiService'; // Importa tu servicio de API

function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);

  useEffect(() => {
    // Obtener películas en cartelera
    api.get('/peliculas/en_cartelera') 
      .then(response => {
        setNowPlayingMovies(response.data);
      })
      .catch(error => {
        console.error('Error al obtener películas en cartelera:', error);
      });

    // Obtener películas próximamente (asegúrate de tener la ruta correcta en tu backend)
    api.get('/peliculas/proximamente') 
      .then(response => {
        setComingSoonMovies(response.data);
      })
      .catch(error => {
        console.error('Error al obtener películas próximamente:', error);
      });
  }, []); // El segundo argumento vacío asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>
      {/* ... resto de tu código */}
    </div>
  );
}

export default HomeScreen;