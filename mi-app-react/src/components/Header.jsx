import React from 'react'; 
import { FaBell } from 'react-icons/fa'; // Si usas React Icons

function Header() {
  return (
    <header>
      <div className="header-content">
        <p>Hi, Ferrucio Tuccine!</p>
        <div className="notification-icon">
          {/* Usando Font Awesome */}
          <FontAwesomeIcon icon="bell" /> 

          {/* O usando React Icons */}
          {/* <FaBell /> */}
        </div>
      </div>
    </header>
  );
}

export default Header;