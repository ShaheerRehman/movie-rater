import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const MovieList = (props) => {
    const movieClicked = movie => {
        props.movieClicked(movie)
    }
    
    const editClicked=movie =>props.editClicked(movie)
    
    return (
        <>
            { props.movies && props.movies.map( movie => {
            return(
            <div className='grid grid-cols-2' key={movie.id}>
                <h2 className='text-xl pointer' onClick={()=>movieClicked(movie)}>{ movie.title }</h2>
                <div className="icons">
                <FontAwesomeIcon className='pad pointer' icon={faEdit} onClick={()=>editClicked(movie)}/>
                <FontAwesomeIcon className='pointer' icon={faTrash} />
                </div>
            </div>
            )
            })}
        </>
    )
}
export default MovieList;