import React, { useState } from 'react';
import axios from 'axios';
import './project.css'

const Movie = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleInputChange = (event) => {

    setSearchQuery(event.target.value);

  }

  const handleSubmit = (event) => {

    event.preventDefault();
    searchMovies();

  }

  const searchMovies = () => {

    axios.get(`https://www.omdbapi.com/?s=${searchQuery}&apikey=22ee213b`) 
      .then(response => {

        setMovies(response.data.Search);

      })
      .catch(error => {

        console.log(error);
        setMovies([]);
        
      });
  }

  return (
    <div className='background'>
      <div id='mainHeader'>
      <h1 className='fontHeader'>Movie-Hunt</h1>
      <h4 className='subhead'>Your Ultimate Destination for Discovering the Next Blockbuster Hit!</h4>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the Movie Name"value={searchQuery} onChange={handleInputChange} />
        <button type="submit">Search</button>
      </form>
      <ul id='list'>
        {movies.map(movie => (
          <li key={movie.imdbID}>
            <h2 id='style'>{movie.Title}</h2>
            <div id='altsource'>
            <img src={movie.Poster} alt={movie.Title}/>
            </div>
            <p style={{color:"rgb(245, 164, 33)"}}>{movie.Year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movie;