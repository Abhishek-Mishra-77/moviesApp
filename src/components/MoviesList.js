import React from 'react';
import Movie from './Movie';
import './MoviesList.css';

const MoviesList = (props) => {
    return (
        <div>
            <ul>
                {props.movies.map((movie) => (
                    <Movie
                        removeMoviesHandler={props.removeMoviesHandler}
                        id={movie.id}
                        title={movie.title}
                        releasedate={movie.releasedate}
                        openingText={movie.openingText}
                    />
                ))}

            </ul>

        </div>
    )
}

export default MoviesList;