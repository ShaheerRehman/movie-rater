import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import API from "../api-service";
import {useCookies} from "react-cookie";


const MovieList = (props) => {
    const movieClicked = movie => props.movieClicked(movie)
    const [token] = useCookies(['mr-token'])

    const editClicked=movie =>props.editClicked(movie)
    
    const removeClicked=movie=>{
        API.removeMovie(movie.id, token).then(()=>props.removeClicked(movie)).catch(error=>console.log(error))

    }
    
    return (
        <>
            { props.movies && props.movies.map( movie => {
            return(
            
            <div className='grid grid-cols-2' key={movie.id}>
                <h2 className='text-xl pointer' onClick={()=>movieClicked(movie)}>{ movie.title }</h2>
                <div className="icons">
                <FontAwesomeIcon className='pad pointer' icon={faEdit} onClick={()=>editClicked(movie)}/>
                <FontAwesomeIcon className='pointer' icon={faTrash}
                                 onClick={()=>removeClicked(movie)}
                />
                </div>
            </div>
            )
            })}
        </>
    )
}
export default MovieList;