import React from 'react';
import { FaBell } from 'react-icons/fa'; // Si usas React Icons
import '../style/Header.css'

function Header() {
  return (
    <header className='welcome'>
      <article className="welcome-card">
        <header className="welcome-card-header">
          <img
            className="welcome-card-image"
            src='https://i.pinimg.com/564x/66/d1/4a/66d14aec6cd11d59264dd58525fdb449.jpg'
            alt="El icono de perfil"
          />
          <div className="welcome-card-info">
            <span className="welcome-card-name">Hi, Ferrucio Tuccine!</span>
            <strong className="welcome-card-username">Let's watch movie together!</strong>
          </div>
        </header>
        <aside>
          <button>
            <i className="fa-solid fa-bell">cam</i>
 
          </button>
        </aside>
      </article>
    </header>
  );
}

export default Header;