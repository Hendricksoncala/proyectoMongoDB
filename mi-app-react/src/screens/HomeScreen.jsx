import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Header from '../components/Header'; 
import Footer from '../components/Footer'; 
import MovieCarousel from '../components/MovieCarousel';
import FirstMovieCard from '../components/FirstMovieCard';
import SecondMovieCard from '../components/SecondMovieCard';


function HomeScreen() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [comingSoonMovies, setComingSoonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Contador de carga para manejar múltiples solicitudes de forma independiente
    let loadCounter = 2;

    const decrementLoadCounter = () => {
      loadCounter -= 1;
      if (loadCounter === 0) setIsLoading(false);
    };

    // Obtener películas en cartelera
    axios.get('http://localhost:3000/api/peliculas/movis/display') 
      .then(response => {
        setNowPlayingMovies(response.data);
      })
      .catch(error => {
        console.error('Error al obtener películas en cartelera:', error);
        setError('Error al cargar películas en cartelera');
      })
      .finally(decrementLoadCounter);

    // Obtener películas próximamente
    axios.get('http://localhost:3000/api/peliculas/movis/soon')
      .then(response => {
        setComingSoonMovies(response.data);
      })
      .catch(error => {
        console.error('Error al obtener películas próximamente:', error);
        setError('Error al cargar películas próximamente');
      })
      .finally(decrementLoadCounter);
  }, []); 

  return (
    <div>
      <Header /> 
      <SearchBar />

      {isLoading ? (
        <p>Cargando películas...</p>
      ) : error ? (
        <p>{error}</p> // Muestra el mensaje de error si hay un error
      ) : (
        <>
          <section className="now-playing"> 
            <h2>Películas en cartelera</h2>
            <div className="movie-carousel"> 
              {nowPlayingMovies.length > 0 ? (
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
              {comingSoonMovies.length > 0 ? (
                comingSoonMovies.map(movie => (
                  <SecondMovieCard key={movie._id} movie={movie} />
                ))
              ) : (
                <p>No hay películas próximamente disponibles.</p>
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
