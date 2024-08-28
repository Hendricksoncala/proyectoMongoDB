import React from 'react';
import '../style/SearchBar.css'; 


function SearchBar() {
  return (
    <div className= "search-bar">
      <input type="text" placeholder="Buscar película, cine, género..." />
      {/* Puedes agregar un icono de búsqueda aquí */}
    </div>
  );
}

export default SearchBar;