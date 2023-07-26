import React, { useState, useRef, useEffect, useCallback } from 'react';
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
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
      const response = await fetch('https://react-1-c95e5-default-rtdb.firebaseio.com/movies.json')

      if (!response.ok) {
        throw new Error('Something went wrong ....Retrying')
      }

      const data = await response.json();


      let loadedMovies = [];
      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releasedate: data[key].date
        })
      }

      setMovies(loadedMovies)
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


  const addNewMovie = async (moviee) => {
    const response = await fetch('https://react-1-c95e5-default-rtdb.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(moviee),
      headers: {
        'Content-type': 'application.json'
      }
    })
    const data = await response.json();
    console.log(data)

    setMovies((movie) => {
      return [...movie, moviee]
    })

  }

  const removeMoviesHandler = async (id) => {
    const response = await fetch(`https://react-1-c95e5-default-rtdb.firebaseio.com/movies/${id}.json`, {
      method: 'DELETE',
    })

    setMovies((movie) => {
      const newItems = movie.filter((item) => item.id !== id);
      return newItems;
    })

    const data = await response.json();

  }


  const cancelfetchMoviesHandler = () => {
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
        {!isLoading && <MoviesList movies={movie} removeMoviesHandler={removeMoviesHandler} />}
        <div className='section-data'>
          {!isLoading && movie.length === 0 && !error && <h3>Found no movies</h3>}
          {isLoading && <h2>Loading.....</h2>}
          {!isLoading && error && <h4>{error}</h4>}
          {error && <button onClick={cancelfetchMoviesHandler} className=''>Cancel Fetching</button>}

        </div>
      </section>
    </div>

  );
}

export default App;
