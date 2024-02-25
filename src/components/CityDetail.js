import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import TheaterMovies from './TheaterMovies'; // Import the TheaterMovies component
import './CityDetail.css';
const CityDetail = () => {
  // Extract the city name from the URL parameter using useParams hook
  const { cityName } = useParams();
  const [city, setCity] = useState(null);
  const [theaters, setTheaters] = useState([]);
  const [selectedTheaterId, setSelectedTheaterId] = useState(null); // Track selected theater

  useEffect(() => {
    // Function to fetch city details based on the city name
    const fetchCityDetails = async () => {
      try {
        // Fetch the list of cities from the API
        const response = await axios.get('/cities/');
        // Find the city object with the matching name
        const selectedCity = response.data.find(city => city.name === cityName);
        // Update the state with the selected city object
        setCity(selectedCity);
        // Fetch theaters for the selected city
        if (selectedCity) {
          const theatersResponse = await axios.get(`/theaters/${selectedCity.id}`);
          setTheaters(theatersResponse.data);
        }
      } catch (error) {
        console.error('Error fetching city details:', error);
      }
    };

    // Call the function to fetch city details when the component mounts
    fetchCityDetails();
  }, [cityName]); // Re-fetch city details when the cityName parameter changes

  // Function to handle theater selection
  const handleTheaterClick = async (theaterId) => {
    setSelectedTheaterId(theaterId); // Set selected theater ID
  };

  return (
    <div className="container">
      <h2 className="heading">City Detail</h2>
      {city ? (
        <div>
          <p>City Name: {city.name}</p>
          <h3>Theaters in {city.name}</h3>
          <ul className="theater-list">
            {theaters.map(theater => (
              <li key={theater.id} className="theater-item">
                {/* Render theater as a button */}
                <button className="theater-button" onClick={() => handleTheaterClick(theater.id)}>
                  {theater.name} - {theater.id}
                </button>
                {/* Render TheaterMovies only when the theater is selected */}
                {selectedTheaterId === theater.id && (
                  <TheaterMovies theaterId={theater.id} />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CityDetail;
