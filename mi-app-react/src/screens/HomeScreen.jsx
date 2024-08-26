import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import SearchBar from '../SearchBar';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import MovieCarousel from '../components/MovieCarousel';

function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Agrega un estado de carga

  useEffect(() => {
    setIsLoading(true); // Inicia la carga

    // Obtener películas en cartelera
    axios.get('http://localhost:3000/api/peliculas/movis/display') 
      .then(response => {
        console.log(response.data);
        setNowPlayingMovies(response.data);
        console.log('peliculas en cartelera');
      })
      .catch(error => {
        console.error('Error al obtener películas en cartelera:', error);
      })
      .finally(() => {
        setIsLoading(false); // Finaliza la carga, incluso si hay un error
      });

    // Obtener películas próximamente
    axios.get('http://localhost:3000/api/peliculas/movis/soon')
      .then(response => {
        setComingSoonMovies(response.data);
        console.log('peliculas proximamente');
      })
      .catch(error => {
        console.error('Error al obtener películas próximamente:', error);
      })
      .finally(() => {
        setIsLoading(false); 
      });
  }, []); 

  return (
    <div>
      <Header /> 
      <SearchBar />

      {isLoading ? ( // Muestra un mensaje de carga mientras se cargan los datos
        <p>Cargando películas...</p>
      ) : (
        <>
          <section className="now-playing"> 
            <h2>Películas en cartelera</h2>
            <div className="movie-carousel"> 
              {nowPlayingMovies.length > 0 ? ( // Renderiza el carrusel solo si hay películas
                <MovieCarousel movies={nowPlayingMovies} /> 
              ) : (
                <p>No hay películas en cartelera disponibles.</p>
              )}
              
            </div>
            <a href="#" className="see-all">See all</a> 
          </section>

          <section className="coming-soon"> 
            <h2>Próximamente</h2>
            <div className="movie-card"> 
              {comingSoonMovies.length > 0 && ( 
                <MovieCard key={comingSoonMovies[0]._id} movie={comingSoonMovies[0]} />
              )}
            </div>
            <a href="#" className="see-all">See all</a> 
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}

export default HomeScreen;