import React, { useState, useEffect } from 'react';
import '../ThirdPageCss/seatDesign.css'; 

function SeatLayout({ onSeatSelectionChange }) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    onSeatSelectionChange(selectedSeats);
  }, [selectedSeats, onSeatSelectionChange]);

  const handleSeatChange = (event) => {
    const { id, checked } = event.target;
    setSelectedSeats((prev) =>
      checked ? [...prev, id] : prev.filter((seat) => seat !== id)
    );
  };

  return (
    <section className="asientos">
      <form id="myform">
        <article className="asientos__normal">
          <div fila="1">
            <small>A</small>
            <div className="asientos__lista">
              <input type="checkbox" name="seat" value="A1" id="A1" onChange={handleSeatChange} />
              <label htmlFor="A1" data-place="1"></label>
              <input type="checkbox" name="seat" value="A2" id="A2" onChange={handleSeatChange} />
              <label htmlFor="A2" data-place="2"></label>
              <input type="checkbox" name="seat" value="A3" id="A3" onChange={handleSeatChange} />
              <label htmlFor="A3" data-place="3"></label>
              <input type="checkbox" name="seat" value="A4" id="A4" onChange={handleSeatChange} />
              <label htmlFor="A4" data-place="4"></label>
              <input type="checkbox" name="seat" value="A5" id="A5" onChange={handleSeatChange} />
              <label htmlFor="A5" data-place="5"></label>
            </div>
          </div>
          <div fila="2">
            <small>B</small>
            <div className="asientos__lista">
              <input type="checkbox" name="seat" value="B1" id="B1" onChange={handleSeatChange} />
              <label htmlFor="B1" data-place="1"></label>
              <input type="checkbox" name="seat" value="B2" id="B2" onChange={handleSeatChange} />
              <label htmlFor="B2" data-place="2"></label>
              <input type="checkbox" name="seat" value="B3" id="B3" onChange={handleSeatChange} />
              <label htmlFor="B3" data-place="3"></label>
              <input type="checkbox" name="seat" value="B4" id="B4" onChange={handleSeatChange} />
              <label htmlFor="B4" data-place="4"></label>
              <input type="checkbox" name="seat" value="B5" id="B5" onChange={handleSeatChange} />
              <label htmlFor="B5" data-place="5"></label>
              <input type="checkbox" name="seat" value="B6" id="B6" onChange={handleSeatChange} />
              <label htmlFor="B6" data-place="6"></label>
              <input type="checkbox" name="seat" value="B7" id="B7" onChange={handleSeatChange} />
              <label htmlFor="B7" data-place="7"></label>
            </div>
          </div>
        </article>
        <article className="asientos__preferenciales">
          <div colum="3">
            <small>C</small>
            <div>
              <input type="checkbox" name="seat" value="C1" id="C1" onChange={handleSeatChange} />
              <label htmlFor="C1" data-place="1"></label>
              <input type="checkbox" name="seat" value="C2" id="C2" onChange={handleSeatChange} />
              <label htmlFor="C2" data-place="2"></label>
              <input type="checkbox" name="seat" value="C3" id="C3" onChange={handleSeatChange} />
              <label htmlFor="C3" data-place="3"></label>
              <input type="checkbox" checked name="seat" value="C4" id="C4" onChange={handleSeatChange} />
              <label htmlFor="C4" data-place="4"></label>
              <input type="checkbox" checked name="seat" value="C5" id="C5" onChange={handleSeatChange} />
              <label htmlFor="C5" data-place="5"></label>
              <input type="checkbox" checked name="seat" value="C6" id="C6" onChange={handleSeatChange} />
              <label htmlFor="C6" data-place="6"></label>
              <input type="checkbox" name="seat" value="C7" id="C7" onChange={handleSeatChange} />
              <label htmlFor="C7" data-place="7"></label>
              <input type="checkbox" name="seat" value="C8" id="C8" onChange={handleSeatChange} />
              <label htmlFor="C8" data-place="8"></label>
              <input type="checkbox" name="seat" value="C9" id="C9" onChange={handleSeatChange} />
              <label htmlFor="C9" data-place="9"></label>
            </div>
          </div>
          <div colum="4">
            <small>D</small>
            <div>
              <input type="checkbox" disabled className="reserved" name="seat" value="D1" id="D1" />
              <label htmlFor="D1" data-place="1"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D2" id="D2" />
              <label htmlFor="D2" data-place="2"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D3" id="D3" />
              <label htmlFor="D3" data-place="3"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D4" id="D4" />
              <label htmlFor="D4" data-place="4"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D5" id="D5" />
              <label htmlFor="D5" data-place="5"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D6" id="D6" />
              <label htmlFor="D6" data-place="6"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D7" id="D7" />
              <label htmlFor="D7" data-place="7"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D8" id="D8" />
              <label htmlFor="D8" data-place="8"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="D9" id="D9" />
              <label htmlFor="D9" data-place="9"></label>
            </div>
          </div>
          <div colum="5">
            <small>E</small>
            <div>
              <input type="checkbox" disabled className="reserved" name="seat" value="E1" id="E1" />
              <label htmlFor="E1" data-place="1"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E2" id="E2" />
              <label htmlFor="E2" data-place="2"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E3" id="E3" />
              <label htmlFor="E3" data-place="3"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E4" id="E4" />
              <label htmlFor="E4" data-place="4"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E5" id="E5" />
              <label htmlFor="E5" data-place="5"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E6" id="E6" />
              <label htmlFor="E6" data-place="6"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E7" id="E7" />
              <label htmlFor="E7" data-place="7"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E8" id="E8" />
              <label htmlFor="E8" data-place="8"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="E9" id="E9" />
              <label htmlFor="E9" data-place="9"></label>
            </div>
          </div>
          <div colum="6">
            <small>F</small>
            <div>
              <input type="checkbox" disabled className="reserved" name="seat" value="F1" id="F1" />
              <label htmlFor="F1" data-place="1"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F2" id="F2" />
              <label htmlFor="F2" data-place="2"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F3" id="F3" />
              <label htmlFor="F3" data-place="3"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F4" id="F4" />
              <label htmlFor="F4" data-place="4"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F5" id="F5" />
              <label htmlFor="F5" data-place="5"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F6" id="F6" />
              <label htmlFor="F6" data-place="6"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F7" id="F7" />
              <label htmlFor="F7" data-place="7"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F8" id="F8" />
              <label htmlFor="F8" data-place="8"></label>
              <input type="checkbox" disabled className="reserved" name="seat" value="F9" id="F9" />
              <label htmlFor="F9" data-place="9"></label>
            </div>
          </div>
        </article>
      </form>
    </section>
  );
}

export default SeatLayout;