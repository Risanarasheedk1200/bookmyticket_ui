import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CityList.css';
const CityList = () => {
  const [cities, setCities] = useState([]);
  const [chosenCity, setChosenCity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cities data when the component mounts
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await axios.get('/cities/');
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setChosenCity(selectedCity);
    navigate(`/city/${selectedCity}`);
  };

  return (
    <div className="container"> 
    <h2 className="heading">List of Cities</h2> 
    <select className="select" value={chosenCity} onChange={handleCityChange}>
      <option value="">Select a city</option>
      {cities.map(city => (
        <option key={city.id} value={city.name}>{city.name}</option>
      ))}
    </select>
  </div>
  );
};

export default CityList;
