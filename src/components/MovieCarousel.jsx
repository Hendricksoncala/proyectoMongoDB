import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import MovieCard from './MovieCard';
import FirstMovieCard from './FirstMovieCard';
import '../style/MovieCarusel.css'

function MovieCarousel({ movies }) {
  const settings = {
    dots: true, // Mostrar puntos de navegación
    infinite: true, // Carrusel infinito
    speed: 500, // Velocidad de transición
    slidesToShow: 1, // Número de tarjetas visibles a la vez
    slidesToScroll: 1,
    centerMode: true, // Mostrar tarjetas centradas
    responsive: [ // Ajustes para diferentes tamaños de pantalla
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    vertical:false,

  };

  return (
    <Slider {...settings}>
      {movies.map(movie => (
        <FirstMovieCard key={movie._id} movie={movie} />
      ))}
    </Slider>
  );
}

export default MovieCarousel;