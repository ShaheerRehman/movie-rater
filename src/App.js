import './App.css';
import { useState, useEffect } from 'react';
import MovieList from './components/movie-list'

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
    }
  return (
    <div className="App px-3 text-white" >
      <header className="App-header">
        <h1 className="font-bold text-4xl pb-2">Movie Rater</h1>
        
      </header>
      <div className="grid grid-cols-2">
          <div>
            <MovieList movies={movies} movieClicked={movieClicked}/>
          </div>
          <div>
            {movies.map(movie=> {
            return(
              <div key={movie.description}>
              <h2>{movie.description}</h2>
              </div>
            )
          }
            
            )}
          </div>
      </div>
    </div>
  );
}

export default App;
