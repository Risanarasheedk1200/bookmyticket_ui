import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MyModal from './Modal';
import { Link } from 'react-router-dom';
import './TheaterMovies.css';
const TheaterMovies = ({ theaterId }) => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieShows, setMovieShows] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`/theaters/${theaterId}/movies`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [theaterId]);

  // Function to fetch movie shows for the selected movie
  const fetchMovieShows = async (movieId) => {
    try {
      const response = await axios.get(`/shows/movies/${movieId}/theaters/${theaterId}/movieshows`);
      setMovieShows(response.data);
      console.log("response from fetch movie shows for movie and the chosen theater ,",response.data);
    } catch (error) {
      console.error('Error fetching movie shows:', error);
    }
  };

  // Function to handle click on a movie
  const handleMovieClick = (movieId) => {
    setSelectedMovie(movieId);
    fetchMovieShows(movieId);
  };

  console.log("movie show list here", movieShows)
  return (
    <div className="container">
      <h2 className="heading">Movies in Theater</h2>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-item" onClick={() => handleMovieClick(movie.id)}>
            <button className="movie-button">{movie.title}</button>
          </li>
        ))}
      </ul>
      {/* Modal to display movie shows */}
      <MyModal
        isOpen={selectedMovie !== null}
        onRequestClose={() => setSelectedMovie(null)}
        content={
          <div>
            <h2>Movie Shows</h2>
            <ul>
              {movieShows.map(movieShow => (
                <li key={movieShow.id}>
                  <Link to={`/seats/${movieShow.id}`}>Show time: {movieShow.showTime}</Link>
                </li>
              ))}
            </ul>
          </div>
        }
      />
    </div>
  );
};

export default TheaterMovies;
