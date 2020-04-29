import React from 'react'
var FontAwesome = require('react-fontawesome')

function MovieList(props) {

    const movieClicked = movie => evt => {// evt means events such onclick
        props.movieClicked(movie)//here movieclicked is props
    }

    const editClicked = movie => {
        props.editClicked(movie)
    }

    const removeClicked = movie => {
        fetch(`${process.env.REACT_APP_API_URL}api/movies/${movie.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token 	${props.token}`
            }
        }).then(resp => props.movieDeleted(movie))
            .catch(error => console.log(error))
    }

    const newMovie = () => {
        props.newMovie()
    }
    
    return (
        <div>
            {props.movies.map(movie => {
                return (
                    <div key={movie.id} className="movie-item">
                        <h3 onClick={movieClicked(movie)}>
                            {movie.title}
                        </h3>
                        <FontAwesome name='edit' onClick={() => editClicked(movie)} />
                        <FontAwesome name='trash' onClick={() => removeClicked(movie)} />
                    </div>
                )
            })}
            <button onClick={newMovie}>Add New Movie</button>
        </div>
    )
}

export default MovieList