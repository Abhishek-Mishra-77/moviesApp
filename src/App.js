import React, { useState, useRef, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import MovieForm from './MovieForm';
import './App.css';


function App() {

  const [movie, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const intervalRef = useRef(null)


  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null)
    try {
      const response = await fetch('https://swapi.dev/api/films')

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying')
      }

      const data = await response.json();
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releasedate: movieData.release_date
        }
      })
      setMovies(transformedMovies)
    }
    catch (error) {
      setError(error.message)
      if (!intervalRef.current) {
        const id = setInterval(fetchMoviesHandler, 5000)
        intervalRef.current = id
      }

    }
    setIsLoading(false);
  }, [])


  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler])


  const addNewMovie = (moviee) => {
    console.log(moviee)
    setMovies((movie) => {
      return [...movie, { title: moviee.title, openingText: moviee.openingText, releasedate: moviee.date, id: Math.random().toString() }]
    })
  }


  const cacelfetchMoviesHandler = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null;
      setError(null)
    }
  }



  return (
    <div>
      <section className='section-form'>
        <MovieForm addNewMovie={addNewMovie} />
      </section>
      <section className='section'>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section className='section1'>
        {!isLoading && <MoviesList movies={movie} />}
        <div className='section-data'>
          {!isLoading && movie.length === 0 && !error && <h3>Found no movies</h3>}
          {isLoading && <h2>Loading.....</h2>}
          {!isLoading && error && <h4>{error}</h4>}
          {error && <button onClick={cacelfetchMoviesHandler} className=''>Cancel Fetching</button>}

        </div>
      </section>
    </div>

  );
}

export default App;
