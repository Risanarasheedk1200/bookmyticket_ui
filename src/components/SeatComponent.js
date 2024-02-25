// SeatComponent.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './SeatComponent.css'; // Import CSS file

const SeatComponent = () => {
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { showId } = useParams();

  const fetchSeats = async () => {
    try {
      const response = await axios.get(`/shows/${showId}/seats`);
      setSeats(response.data);
    } catch (error) {
      console.error('Error fetching seats:', error);
    }
  };

  useEffect(() => {
    fetchSeats();
  }, [showId]);

  const handleSeatClick = (seatId) => {
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  const handleBookSeats = async () => {
    const userId = localStorage.getItem("userId")
    if (!userId) {
      console.error("User ID not found in local storage.");
      return; // Exit the function if userId is not available
    }
    try {
      const response = await axios.post('/bookings/create', {
        userId: userId,
        showId: showId,
        seatIds: selectedSeats,
      });
      console.log('Booking successful:', response.data);
      // Fetch the updated list of seats
      fetchSeats();
      // Clear the selected seats
      setSelectedSeats([]);
    } catch (error) {
      console.error('Error booking seats:', error);
      // Optionally, you can handle errors and display an error message
    }
  };

  return (
    <div>
      <h2>Available Seats</h2>
      <ul className="seat-list">
        {seats.map(seat => (
          <li
            key={seat.id}
            onClick={() => handleSeatClick(seat.id)}
            className={`seat ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
          >
            Row- {seat.row} : Seat {seat.number}
          </li>
        ))}
      </ul>
      {selectedSeats.length > 0 && (
        <button onClick={handleBookSeats} className="book-button">Book Selected Seats</button>
      )}
    </div>
  );
};

export default SeatComponent;
