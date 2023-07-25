import React, { useState } from 'react';
import './Movieform.css';

const MovieForm = (props) => {

    const [title, setTitle] = useState('');
    const [openingText, setopeningText] = useState('');
    const [date, setDate] = useState('');




    const onSubmitHandler = (e) => {
        e.preventDefault();
        if (title.length === '' || date.length === '' || openingText.length === '') {
            alert('please fell all the input field');

        }

        props.addNewMovie({title, date, openingText})

    }



    return (
        <div className='movie-form'>
            <form className='form' onSubmit={onSubmitHandler}>
                <label>Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    id='title' />
                <label>openingText</label>
                <textarea
                    type='text'
                    value={openingText}
                    onChange={(e) => setopeningText(e.target.value)}
                    id='textarea'></textarea>
                <label>Release Date</label>
                <input
                    type='text'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    id='date' />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default MovieForm;