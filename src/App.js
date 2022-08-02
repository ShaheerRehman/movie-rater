import './App.css';
import { useState, useEffect } from 'react';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from "./components/movie-form";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect( () => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token a133158a036b647ba09191b94d6661c9e67f38c9"
      }})
    .then(resp=>resp.json())
    .then(resp=>setMovies(resp))
    .catch(error=>console.log(error))
      }, [])


  const movieClicked = movie =>{
    setSelectedMovie(movie);
    setEditedMovie(null)
  }
  
  const newMovie = () => {
    setEditedMovie({title:'',description:''})
    setSelectedMovie(null)
  }
  
  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectedMovie(null)
  };
  
  const updatedMovie = movie => {
    const newMovies = movies.map(mov => {
      if (mov.id === movie.id){
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }
  const movieCreated = movie => {
    const newMovies = [...movies, movie]
    setMovies(newMovies)
  }

  return (
    
    <div className="App px-3 text-white" >
      <div className="container">
      

      <header className="App-header">
        <h1 className="font-bold text-4xl pb-2">Movie Rater</h1>
      </header>

      <div className="grid grid-cols-2">

        <div>
          <MovieList movies={movies} movieClicked={movieClicked} editClicked={editClicked}/>
          <button className='inline-block px-4 my-4 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring' onClick={newMovie}>New Movie</button>
        </div>

        <div>
          <MovieDetails movie={selectedMovie} updateMovie={movieClicked}/>
          {editedMovie? (<MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/>):null}
          
        </div>

      </div>
      </div>
    </div>
  );
}

export default App;
