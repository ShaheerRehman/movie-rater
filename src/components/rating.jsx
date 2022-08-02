import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



function Stars(props){
    const stars = Math.round(props.rating)
    let remaining = 5-stars

    return(
        <>
        {[...Array(stars)].map(x=> { return <FontAwesomeIcon className='orange' icon={faStar}  />})}

        {[...Array(remaining)].map(x=> { return <FontAwesomeIcon  icon={faStar}  />})}
        ({props.num})
        </>
    )
}

export default Stars;

