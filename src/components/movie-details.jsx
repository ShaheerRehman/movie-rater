import React, { useState } from 'react';
import Stars from './rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {useCookies} from "react-cookie";


const MovieDetails = (props) => {
    const [highlighted, setHighlighted] = useState(-1)
    // const highlightRate = high => () => setHighlighted(high);\
    const [token] = useCookies(['mr-token'])

    const highlightRate = function (high){
        return function() {
        setHighlighted(high)
        }
    };

    const rateClicked = rate=> evt =>{
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/rate_movie/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${token['mr-token']}`
            },
            body: JSON.stringify({stars:rate+1})
        })
          .then(()=>getDetails())
          // .then(resp=>resp.json())
          // .then(resp=>console.log(resp))
          .catch(error=>console.log(error))
    }
    const getDetails = () => {
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
                "Authorization": `Token ${token['mr-token']}`

            }
        })
          .then(resp=>resp.json())
          .then(resp=>props.updateMovie(resp))
          .catch(error=>console.log(error))
    }
    
    return(

        <>
        
        { props.movie ? (
            <>
            <h1 className='text-2xl font-bold'>{ props.movie.title }</h1>
            <p className='text-lg'>{ props.movie.description }</p>
            <Stars num={props.movie.no_of_ratings} rating={ props.movie.avg_rating }/>
            <div className='py-2'><hr style={{color:'darkred'}} /></div>
            {/* <hr /> */}
            <div className='contain'>
                <h2 className='text-2xl font-bold' style={{color:"purple"}} >Rate it</h2>

            {[...Array(5)].map((e, i)=> { return <FontAwesomeIcon key={i} icon={faStar} className={ highlighted>i-1 ? 'purple':''}
            onMouseEnter={highlightRate(i)}
            onMouseLeave={highlightRate(-1)}
            onClick={rateClicked(i)} />})}
            </div>

            </>
            ):null}
        </>
    )
}

export default MovieDetails;