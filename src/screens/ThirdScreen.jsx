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
          // Manejar el caso de que no haya funciones disponibles
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
      // Obtener asientos de la sala asociada a la función
      axios.get(`http://localhost:3000/api/salas/${selectedFuncion.sala_id}/asientos`)
        .then(asientosResponse => {
          const asientos = asientosResponse.data;

          // Marcar los asientos ocupados en la función seleccionada
          const asientosOcupados = selectedFuncion.asientos_ocupados.map(asientoId =>
            asientos.find(asiento => asiento._id.toString() === asientoId.toString())?.numero
          );

          setSeats(asientos.map(asiento => ({
            number: asiento.numero, // O adapta según tu estructura de datos
            fila: asiento.fila,
            status: asientosOcupados.includes(asiento.numero) ? 'occupied' : 'available'
          })));
        })
        .catch(error => {
          console.error('Error al obtener asientos de la sala:', error);
        });
    }
  }, [selectedFuncion]);

  const handleFuncionSelect = (funcion) => {
    setSelectedFuncion(funcion);
    setTotalPrice(0);
    setSelectedSeats([]);
  };

  const handleSeatSelectionChange = (newSelectedSeats) => {
    setSelectedSeats(newSelectedSeats);
    setTotalPrice(newSelectedSeats.length * (selectedFuncion?.precio || 0));
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post(`/api/funciones/${selectedFuncion._id}/reservar`, {
        asientosSeleccionados: selectedSeats.map(seatNumber => {
          const [fila, numeroStr] = seatNumber.split('');
          const numero = parseInt(numeroStr);
          return { numero, fila, categoria: 'normal' }; // Asume que todos los asientos son "normales"
        })
      });
      console.log(response.data);
      navigate(`/confirmacion/${response.data._id}`);
    } catch (error) {
      console.error('Error al reservar asientos:', error);
      // Manejar el error en la interfaz de usuario
    }
  };

  if (!pelicula || !funciones) {
    return <div>Cargando...</div>;
  }

  const sssss = Array.from({ length: 50 }, (_, index) => ({
    objectId: `objectId_${index + 1}`,
    idNumber: index + 1
  }));

  // Dividir los asientos en grupos de 10
  const groupedSeats = [];
  for (let i = 0; i < sssss.length; i += 10) {
    groupedSeats.push(sssss.slice(i, i + 10));
  }
  const sentToDatabase = async () => {
    try {
      const response = await axios.post(`/api/funciones/${selectedFuncion._id}/reservar`, { // <- ACA DEBE IR LA API DE LA CREACION 'POST' DE LA COLECCION 'TICKETS'
        //CREAR SILLAS
      });
      console.log(response.data);
      navigate(`/confirmacion/${response.data._id}`);
    } catch (error) {
      console.error('Error al reservar asientos:', error);
      // Manejar el error en la interfaz de usuario
    }
  };

  return (
    <div className="seat-selection">
      <div className="header">
        <Link to={`/pelicula/${id}`} className="back-button">⬅️</Link>
        <h1>Choose Seat</h1>
        {/* Puedes agregar el menú de tres puntos aquí si es necesario */}
      </div>

      <div className="screen">Screen This Way</div>

      <SeatLayout
        seats={seats}
        occupiedSeats={seats.flat().filter(seat => seat.status === 'occupied').map(seat => seat.number)}
        onSeatSelectionChange={handleSeatSelectionChange}
      />
      {/* SILLAS */}
      <div>
        {groupedSeats.map((group, groupIndex) => (
          <div key={groupIndex} className="seat-row">
            {group.map(seat => (
              <div key={seat.objectId} className="seat-item" onClick={sentToDatabase}>
                {/* <p>ObjectId: {seat.objectId}</p>
                <p>IdNumber: {seat.idNumber}</p> */}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Leyenda de asientos */}
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

      {/* Horarios de funciones */}
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
      {/* Resumen y botón de compra */}
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