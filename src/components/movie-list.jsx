import React from 'react';


const MovieList = (props) => {
    const movieClicked = movie => evt => {
        props.movieClicked(movie)
    }    
    return (
        <>
            { props.movies && props.movies.map( movie => {
            return(
            <div key={movie.id}>
                <h2 onClick={movieClicked(movie)}>{ movie.title }</h2>
            </div>
            )
            })}
        </>
    )
}
export default MovieList;