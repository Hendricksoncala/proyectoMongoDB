import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../style/ThirdScreenCss.css';
import SeatLayout from '../ThirdPage/SeatLayout';


function ThirdScreen() {
  const { id } = useParams(); // ID de la película
  const navigate = useNavigate();

  const [pelicula, setPelicula] = useState(null); 
  const [funciones, setFunciones] = useState([]);
  const [selectedFuncion, setSelectedFuncion] = useState(null);
  const [seats, setSeats] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Obtener detalles de la película
    axios.get(`http://localhost:3000/api/peliculas/${id}`)
      .then(response => {
        setPelicula(response.data);

        // Obtener funciones de la película
        return axios.get(`http://localhost:3000/api/peliculas/${id}/funciones`);
      })
      .then(funcionesResponse => {
        setFunciones(funcionesResponse.data);
        if (funcionesResponse.data.length > 0) {
          setSelectedFuncion(funcionesResponse.data[0]);
        } else {
          console.error('No hay funciones disponibles para esta película.');
          // Puedes mostrar un mensaje al usuario o redirigirlo a otra pantalla
        }
      })
      .catch(error => {
        console.error('Error al obtener detalles de la película o funciones:', error);
        // Manejar el error en la interfaz de usuario
      });
  }, [id]);

  useEffect(() => {
    if (selectedFuncion) {
      // Obtener asientos ocupados de la función seleccionada
      const asientosOcupados = selectedFuncion.asientos_ocupados.map(asiento => asiento.numero);
  
      // Crear la matriz inicial de asientos con base en las filas y asientos por fila
      const filas = ['A', 'B', 'C', 'D', 'E', 'F']; 
      const asientosPorFila = 8; 
  
      const initialSeats = filas.map(fila => 
        Array.from({ length: asientosPorFila }, (_, colIndex) => {
          const seatNumber = fila + (colIndex + 1);
          return {
            number: seatNumber,
            status: asientosOcupados.includes(seatNumber) ? 'occupied' : 'available'
          };
        })
      );
  
      setSeats(initialSeats);
    }
  }, [selectedFuncion]);

  const actualizarEstadoAsientos = (asientosOcupados) => {
    setSeats(prevSeats => 
      prevSeats.map(row => 
        row.map(seat => 
          asientosOcupados.includes(seat.number) ? { ...seat, status: 'occupied' } : seat
        )
      )
    );
  }

  const handleFuncionSelect = (funcion) => {
    setSelectedFuncion(funcion);
    setTotalPrice(0); 
    setSelectedSeats([]); 
  };

  const handleSeatSelectionChange = (seatNumbers) => {
    setSelectedSeats(seatNumbers);
    setTotalPrice(seatNumbers.length * (selectedFuncion?.precio || 0)); // Actualiza el precio total
  };

  const handlePurchase = async () => {
    try {
      console.log('Purchase');
      const url = `http://localhost:3000/api/funciones/${selectedFuncion._id}/reservar`;
      console.log("URL de la solicitud:", url);
      const response = await axios.post(url, {
        asientosSeleccionados: selectedSeats
      });
  
      console.log("Respuesta del servidor:", response.data);
      // Actualizar los asientos ocupados en la interfaz de usuario
      actualizarEstadoAsientos(response.data.asientosOcupados);
  
      navigate(`/confirmacion/${response.data._id}`);
    } catch (error) {
      console.error('Error al reservar asientos:', error);
      // Podrías mostrar un mensaje de error al usuario aquí
    }
  };

  return (
    <div className="seat-selection">
      <div className="header">
        <Link to={`/pelicula/${id}`} className="back-button">⬅️</Link> 
        <h1>Choose Seat</h1>
      </div>

      <div className="screen">Screen This Way</div> 

      <SeatLayout 
        seats={seats} 
        occupiedSeats={seats.flat().filter(seat => seat.status === 'occupied').map(seat => seat.number)} 
        onSeatSelectionChange={handleSeatSelectionChange} 
      />

      <div className="seat-legend">
        <div className="legend-item">
          <div className="seat available"></div>
          <p>Available</p>
        </div>
        <div className="legend-item">
          <div className="seat reserved"></div>
          <p>Reserved</p>
        </div>
        <div className="legend-item">
          <div className="seat selected"></div>
          <p>Selected</p>
        </div>
      </div>

      <div className="schedule">
        {funciones.map(funcion => (
          <button 
            key={funcion._id} 
            className={`schedule-button ${selectedFuncion && selectedFuncion._id === funcion._id ? 'selected' : ''}`}
            onClick={() => handleFuncionSelect(funcion)}
          >
            <p>{new Date(funcion.horario.fecha).toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}</p> 
            <p>{funcion.horario.hora}</p>
            <p>{funcion.precio} - {funcion.tipoProyeccion}</p> 
          </button>
        ))}
      </div>

      <div className="booking-summary">
        <p>Price</p>
        <h2>${totalPrice.toFixed(2)}</h2>
        <button type="button" onClick={handlePurchase} disabled={!selectedFuncion || selectedSeats.length === 0}>
          Buy ticket
        </button>
      </div>
    </div>
  );
}

export default ThirdScreen;