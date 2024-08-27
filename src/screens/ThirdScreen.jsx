import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../ThirdPageCss/ThirdScreenCss.css';

function ThirdScreen() {
  const { id } = useParams(); // Obtén el ID de la función de la URL
  const [funcion, setFuncion] = useState(null);
  const [seats, setSeats] = useState([]); 
  const [selectedSeats, setSelectedSeats] = useState([]);

  app.post('/api/funciones/:id/reservar', async (req, res) => {
    try {
      const { asientosSeleccionados } = req.body;
      const funcionId = req.params.id;
  
      // Aquí puedes insertar cada asiento seleccionado en tu base de datos
      asientosSeleccionados.forEach(async asiento => {
        await AsientoModel.create({
          numero: asiento.number,
          fila: asiento.fila,
          categoria: asiento.categoria,
          sala_id: asiento.sala_id,
          estado: 'ocupado',
          funcion_id: funcionId
        });
      });
  
      res.status(200).json({ message: 'Asientos reservados con éxito.' });
    } catch (error) {
      res.status(500).json({ error: 'Error al reservar asientos' });
    }
  });

  useEffect(() => {
    // Obtener detalles de la función desde el backend
    axios.get(`http://localhost:3000/api/funciones/${id}`)
      .then(response => {
        setFuncion(response.data);

        // Inicializa el estado de los asientos basándote en la información de la sala
        const totalSeats = response.data.sala.capacidad; 
        const initialSeats = Array.from({ length: totalSeats }, (_, i) => ({
          number: i + 1,
          fila: i < 5 ? 'A' : 'B', // Esto es un ejemplo, ajusta según tu lógica
          status: response.data.asientosOcupados.includes(i + 1) ? 'ocupado' : 'disponible',
          categoria: 'normal',
          sala_id: response.data.sala._id,
        }));
        setSeats(initialSeats);
      })
      .catch(error => {
        console.error('Error al obtener detalles de la función:', error);
      });
  }, [id]);

  const toggleSeat = (seatNumber) => {
    const seatIndex = seats.findIndex(seat => seat.number === seatNumber);

    if (seats[seatIndex].status === 'disponible') {
      setSeats(prevSeats => 
        prevSeats.map((seat, index) => 
          index === seatIndex ? { ...seat, status: 'selected' } : seat
        )
      );
      setSelectedSeats(prevSelected => [...prevSelected, seatNumber]);
    } else if (seats[seatIndex].status === 'selected') {
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
      const selectedSeatDetails = seats.filter(seat => selectedSeats.includes(seat.number));
      const response = await axios.post(`/api/funciones/${id}/reservar`, {
        asientosSeleccionados: selectedSeatDetails
      });
      console.log(response.data); 
      setSeats(prevSeats => 
        prevSeats.map(seat => 
          selectedSeats.includes(seat.number) ? { ...seat, status: 'ocupado' } : seat
        )
      );
      setSelectedSeats([]); 
    } catch (error) {
      console.error('Error al reservar asientos:', error);
    }
  };

  if (!funcion) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="seat-selection">
      {/* Contenido */}
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
