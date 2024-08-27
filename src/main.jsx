import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';


// Asegúrate de que 'root' está en el HTML
const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('No se encontró el elemento con id "root"');
}
