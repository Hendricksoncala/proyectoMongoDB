import React from 'react';
import { FaBell } from 'react-icons/fa'; // Si usas React Icons
import '../style/Footer.css'


function Footer() {
    return (
        <footer>
            <div className="footer">
                <button className="footer-icon">
                    <i className="fa fa-home"></i>
                    <p>Home</p>
                </button>
                <button className="footer-icon">
                    <i className="fa fa-search"></i>
                    <p>Browse</p>
                </button>
                <button className="footer-icon">
                    <i className="fa fa-ticket"></i>
                    <p>Tickets</p>
                </button>
                <button className="footer-icon">
                    <i className="fa fa-user"></i>
                    <p>Profile</p>
                </button>
                </div>
        </footer>
    );
}

export default Footer;