import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../style/ThirdScreenCss.css' 
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
  const seatRefs = useRef([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/peliculas/${id}`)
      .then(response => {
        setPelicula(response.data);
        return axios.get(`http://localhost:3000/api/peliculas/${id}/funciones`);
      })
      .then(funcionesResponse => {
        setFunciones(funcionesResponse.data);
        if (funcionesResponse.data.length > 0) {
          setSelectedFuncion(funcionesResponse.data[0]);
        }
      })
      .catch(error => {
        console.error('Error al obtener detalles de la película o funciones:', error.response ? error.response.data : error.message);
      });
  }, [id]);

  useEffect(() => {
    if (selectedFuncion) {
      axios.get(`http://localhost:3000/api/funciones/${selectedFuncion._id}/asientos`)
        .then(asientosResponse => {
          const asientosOcupados = asientosResponse.data.map(asiento => asiento.numero);
  
          const filas = ['A', 'B', 'C', 'D', 'E', 'F'];
          const asientosPorFila = 8; // Ajusta según la capacidad de la sala
  
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
        })
        .catch(error => {
          console.error('Error al obtener asientos de la función:', error.response ? error.response.data : error.message);
        });
    }
  }, [selectedFuncion]);

  const toggleSeat = (rowIndex, colIndex) => {
    const seat = seats[rowIndex][colIndex];
    if (seat.status === 'available') {
      setSeats(prevSeats => {
        const newSeats = [...prevSeats];
        newSeats[rowIndex][colIndex] = { ...seat, status: 'selected' };
        return newSeats;
      });
      setSelectedSeats(prevSelected => [...prevSelected, seat.number]);
      setTotalPrice(prevPrice => prevPrice + (selectedFuncion?.precio || 0));
    } else if (seat.status === 'selected') {
      setSeats(prevSeats => {
        const newSeats = [...prevSeats];
        newSeats[rowIndex][colIndex] = { ...seat, status: 'available' };
        return newSeats;
      });
      setSelectedSeats(prevSelected => prevSelected.filter(num => num !== seat.number));
      setTotalPrice(prevPrice => prevPrice - (selectedFuncion?.precio || 0));
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`/api/funciones/${selectedFuncion._id}/reservar`, {
        asientosSeleccionados: selectedSeats.map(seatNumber => {
          const [fila, numeroStr] = seatNumber.split('');
          const numero = parseInt(numeroStr); // Convertir el número a entero
          const categoria = obtenerCategoriaDesdeNumero(seatNumber); 
          return { numero, fila, categoria };
        })
      });
  
      console.log(response.data); 
  
      // Actualiza el estado de los asientos después de la reserva exitosa
      setSeats(prevSeats => 
        prevSeats.map(row => 
          row.map(seat => 
            selectedSeats.includes(seat.number) ? { ...seat, status: 'occupied' } : seat
          )
        )
      );
      setSelectedSeats([]);
      setTotalPrice(0); // Reinicia el precio total
  
      navigate(`/confirmacion/${response.data._id}`); 
    } catch (error) {
      console.error('Error al reservar asientos:', error);
      // Manejar el error en la interfaz de usuario (mostrar un mensaje de error, etc.)
    }
  };

  if (!pelicula || !funciones) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="seat-selection">
      <div className="header">
        <Link to={`/pelicula/${id}`} className="back-button">⬅️</Link>
        <h1>Choose Seat</h1>
      </div>

      <div className="screen">Screen This Way</div>

      <SeatLayout 
      seats={seats} 
      onSeatSelectionChange={setSelectedSeats} 
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
            onClick={() => setSelectedFuncion(funcion)}
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
        <button className="buy-ticket" onClick={handlePurchase} disabled={!selectedFuncion || selectedSeats.length === 0}>
          Buy ticket
        </button>
      </div>
    </div>
  );
}

export default ThirdScreen;