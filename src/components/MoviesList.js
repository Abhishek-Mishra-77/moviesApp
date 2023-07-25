import React from 'react';
import Movie from './Movie';
import './MoviesList.css';

const MoviesList = (props) => {
    return (
        <ul>
            {props.movies.map((movie) => (
                <Movie
                    title={movie.title}
                    releasedate={movie.releasedate}
                    openingText={movie.openingText}
                />
            ))}
        </ul>
    )
}

export default MoviesList;