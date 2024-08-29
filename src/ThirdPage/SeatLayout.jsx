import React, { useState, useEffect } from 'react';
// import '../ThirdPageCss/seatDesign.css'; 
import '../ThirdPageCss/seatDesign.css'

function SeatLayout({ seats, occupiedSeats, onSeatSelectionChange }) {
  const handleSeatClick = (seatNumber) => {
    if (occupiedSeats.includes(seatNumber)) return; 

    onSeatSelectionChange(prevSelectedSeats => {
      if (prevSelectedSeats.includes(seatNumber)) {
        // Deseleccionar asiento
        return prevSelectedSeats.filter(num => num !== seatNumber);
      } else {
        // Seleccionar asiento
        return [...prevSelectedSeats, seatNumber];
      }
    });
  };

  return (
    <section className="asientos">
      <form id="myform">
        {seats.map((row, rowIndex) => (
          <article key={rowIndex} className="asientos__normal"> 
            <div fila={rowIndex + 1}> 
              <small>{String.fromCharCode(65 + rowIndex)}</small>
              <div className="asientos__lista">
                {row.map(seat => (
                  <button 
                    key={seat.number}
                    className={`seat ${seat.status}`}
                    onClick={() => handleSeatClick(seat.number)}
                    disabled={seat.status === 'occupied'}
                  >
                    {seat.status !== 'occupied' && seat.number} 
                  </button>
                ))}
              </div>
            </div>
          </article>
        ))}
      </form>
    </section>
  );
}

export default SeatLayout;
