import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../ThirdPageCss/ThirdScreenCss.css'

function ThirdScreen() {
  const { id } = useParams(); // Obtén el ID de la función de la URL
  const [funcion, setFuncion] = useState(null);
  const [seats, setSeats] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    // Obtener detalles de la función desde el backend
    axios.get(`http://localhost:3000/api/funciones/${id}`)
      .then(response => {
        setFuncion(response.data);

        // Inicializa el estado de los asientos basándote en la información de la sala
        // (Asumiendo que tienes acceso a los detalles de la sala en la respuesta)
        const totalSeats = response.data.sala.capacidad; // O ajusta según tu estructura de datos
        const initialSeats = Array.from({ length: totalSeats }, (_, i) => ({
          number: i + 1,
          status: response.data.asientosOcupados.includes(i + 1) ? 'ocupado' : 'disponible' 
        }));
        setSeats(initialSeats);
      })
      .catch(error => {
        console.error('Error al obtener detalles de la función:', error);
        // Manejar el error en la interfaz de usuario (mostrar un mensaje, etc.)
      });
  }, [id]);

  const toggleSeat = (seatNumber) => {
    const seatIndex = seats.findIndex(seat => seat.number === seatNumber);

    if (seats[seatIndex].status === 'disponible') {
      // Seleccionar asiento
      setSeats(prevSeats => 
        prevSeats.map((seat, index) => 
          index === seatIndex ? { ...seat, status: 'selected' } : seat
        )
      );
      setSelectedSeats(prevSelected => [...prevSelected, seatNumber]);
    } else if (seats[seatIndex].status === 'selected') {
      // Deseleccionar asiento
      setSeats(prevSeats => 
        prevSeats.map((seat, index) => 
          index === seatIndex ? { ...seat, status: 'disponible' } : seat
        )
      );
      setSelectedSeats(prevSelected => prevSelected.filter(num => num !== seatNumber));
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`/api/funciones/${funcionId}/reservar`, {
        asientosSeleccionados: selectedSeats
      });
      console.log(response.data); 
      // Actualiza el estado de los asientos después de la reserva exitosa
      setSeats(prevSeats => 
        prevSeats.map(seat => 
          selectedSeats.includes(seat.number) ? { ...seat, status: 'ocupado' } : seat
        )
      );
      setSelectedSeats([]); 
    } catch (error) {
      console.error('Error al reservar asientos:', error);
      // Manejar el error en la interfaz de usuario
    }
  };

  if (!funcion) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="seat-selection">
      {/* ... (Encabezado y otros elementos) */}

      <div className="seats">
        {seats.map(seat => (
          <button
            key={seat.number}
            className={`seat ${seat.status}`}
            onClick={() => toggleSeat(seat.number)}
            disabled={seat.status === 'ocupado'}
          >
            {seat.number}
          </button>
        ))}
      </div>

      <div className="summary">
        <h2>Asientos Seleccionados:</h2>
        <ul>
          {selectedSeats.map(seatNumber => (
            <li key={seatNumber}>Asiento {seatNumber}</li>
          ))}
        </ul>
      </div>

      <button className="buy-ticket" onClick={handlePurchase}>Comprar Boletos</button>
    </div>
  );
}

export default ThirdScreen;