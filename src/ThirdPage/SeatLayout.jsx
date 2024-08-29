import { useState, useEffect } from 'react';
import '../style/ThirdScreenCss.css';

function SeatLayout({ seats, occupiedSeats, onSeatSelectionChange }) {
  const [selectedSeatsLocal, setSelectedSeatsLocal] = useState([]);

  const handleSeatClick = (e, seatNumber) => {
    e.preventDefault(); // Evita la recarga de la página al hacer clic
    if (occupiedSeats.includes(seatNumber)) return;

    setSelectedSeatsLocal(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatNumber)) {
        // Deseleccionar asiento
        return prevSelectedSeats.filter(num => num !== seatNumber);
      } else {
        // Seleccionar asiento
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };
  useEffect(() => {
    onSeatSelectionChange(selectedSeatsLocal)
  }, [selectedSeatsLocal])


  return (
    <section className="asientos">
      <form id="myform">
        {seats.map((row, rowIndex) => (
          <article key={rowIndex} className="asientos__normal">
            <div>
              <small>{String.fromCharCode(65 + rowIndex)}</small>
              <div className="asientos__lista">
                {row.map(seat => (
                  <button
                    key={seat.number}
                    className={`seat ${seat.status} ${selectedSeatsLocal.includes(seat.number) ? 'selected' : ''}`}
                    onClick={(e) => handleSeatClick(e, seat.number)} // Pasa el evento al manejador
                    disabled={seat.status === 'occupied'}
                  >
                    {seat.status !== 'occupied' && seat.number}
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
        {/* Este botón no es necesario para evitar la recarga, pero puede ser útil para tu flujo */}
        {/* <button type="button" onClick={handleConfirmSelection}>Confirmar Selección</button> */}
      </form>
    </section>
  );
}

export default SeatLayout;