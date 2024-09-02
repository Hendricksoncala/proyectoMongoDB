import React from 'react';
import '../style/SearchBar.css'; 
import lupa from '../assets/lupa.svg';

function SearchBar() {
  return (
    <div className= "search-bar">
      <img src={lupa}  /> 
      <input type="text" placeholder="Buscar película, cine, género..." />
      {/* Puedes agregar un icono de búsqueda aquí */}
    </div>
  );
}

export default SearchBar;