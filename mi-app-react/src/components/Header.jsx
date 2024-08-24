import React from 'react'; 
import { FaBell } from 'react-icons/fa'; // Si usas React Icons



function Header() {
  return (
    <header>
      <div className="header-content">
        <p>Hi, Ferrucio Tuccine!</p>
        <div className="notification-icon">
          {/* Usando Font Awesome */}
          <i class="fa-solid fa-bell"></i>

          {/* O usando React Icons */}
          {/* <FaBell /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;