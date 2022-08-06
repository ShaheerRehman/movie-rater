import React from 'react';
import { useState, useEffect } from "react";
import API from "../api-service";
import {useCookies} from "react-cookie";


function MovieForm(props) {
  
  const [ title, setTitle ] = useState('')
  const [description, setDescription] = useState('')
  const [token] = useCookies(['mr-token'])
  const disabled = title.length===0||description.length===0

  useEffect(()=>{
    setTitle(props.movie.title);
    setDescription(props.movie.description)
  },[props.movie])
  
  const updateClicked = () => {
    API.updateMovie(props.movie.id, {title, description}, token).then(resp=>props.updatedMovie(resp)).catch(error=>console.log(error))
  }
  
  const createClicked = () => {
    API.createMovie({title, description},token).then(resp=>props.movieCreated(resp)).catch(error=>console.log(error))
  }
  
  return (
    <>
      { props.movie ?(
        <>
          <label
            className="font-medium"
            htmlFor='title'>Title</label><br/>
      
          <input id='title'
                 className="focus:ring-indigo-500 focus:border-indigo-500 block w-3/4 pl-2 pr-12 sm:text-md border-gray-300 rounded-md text-black"
                 type='text' placeholder='Title' value={title} onChange={evt=>setTitle(evt.target.value)}/><br/>
          <label
            className='font-medium' htmlFor='description'>Description</label><br/>
      
          <textarea
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-3/4 pl-2 pr-12 sm:text-md border-gray-300 rounded-md text-black"
            id='description' type='text' placeholder='Description' value={description} onChange={evt=>setDescription(evt.target.value)}/><br/>
          {props.movie.id ?
            <button
              className="inline-block px-4 py-1 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring" disabled={disabled}
              onClick={updateClicked}>Update</button>:
            <button
              className="inline-block px-4 py-1 text-sm font-medium text-white bg-indigo-600 border border-indigo-600 rounded active:text-indigo-500 hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring" disabled={disabled}
              onClick={createClicked}>Create</button>
          }
        </>
      ):null}
      
    </>
  )

}
export default MovieForm;