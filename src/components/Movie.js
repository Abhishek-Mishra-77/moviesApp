import React from 'react';
import './Movie.css';

const Movie = (props) => {

    return (
        <div className='movie'>
            <li >
                <h2>{props.title}</h2>
                <p>{props.openingText}</p>
            </li>
            <button onClick={() => props.removeMoviesHandler(props.id)}>Remove</button>
        </div>
    )
}

export default Movie;