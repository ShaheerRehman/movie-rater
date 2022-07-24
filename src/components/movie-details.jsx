import React from 'react';

const MovieDetails = (props) => {
    return(
        <>
        { props.movie ? (
            <>
            <h1 className='text-3xl font-bold'>{ props.movie.title }</h1>
            <p>{ props.movie.description }</p>
            </>
            ):(
                null
            )}
        </>
    )
}

export default MovieDetails;