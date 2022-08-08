import "./App.css";
import { useState, useEffect } from "react";
import MovieList from "./components/movie-list";
import MovieDetails from "./components/movie-details";
import MovieForm from "./components/movie-form";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClapperboard,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { useFetch } from "./hooks/useFetch";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(["mr-token"]);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (!token["mr-token"]) window.location.href = "/";
  }, [token]);

  const newMovie = () => {
    setEditedMovie({ title: "", description: "" });
    setSelectedMovie(null);
  };
  const editClicked = (movie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  };

  const removeClicked = (movie) => {
    const newMovies = movies.filter((mov) => mov.id !== movie.id);
    setMovies(newMovies);
    // setSelectedMovie(null)
  };

  const updatedMovie = (movie) => {
    const newMovies = movies.map((mov) => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    });
    setMovies(newMovies);
  };
  const movieCreated = (movie) => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  };

  const movieClicked = (movie) => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  };

  const logoutUser = () => {
    deleteToken(["mr-token"]);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading movies...</h1>;

  return (
    <div className="App px-3 text-white">
      <div className="container">
        <header className="App-header">
          <h1 className="font-bold text-4xl py-4">
            <FontAwesomeIcon className="px-4" icon={faClapperboard} />

            <span>Movie Rater</span>
          </h1>
          <FontAwesomeIcon icon={faRightFromBracket} onClick={logoutUser} />
        </header>

        <div className="grid grid-cols-2">
          <div>
            <MovieList
              movies={movies}
              movieClicked={movieClicked}
              editClicked={editClicked}
              removeClicked={removeClicked}
            />
            <button
              className="inline-block px-4 my-4 py-1 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white active:bg-indigo-500 focus:outline-none focus:ring"
              onClick={newMovie}
            >
              New Movie
            </button>
          </div>

          <div>
            <MovieDetails movie={selectedMovie} updateMovie={movieClicked} />
            {editedMovie ? (
              <MovieForm
                movie={editedMovie}
                updatedMovie={updatedMovie}
                movieCreated={movieCreated}
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
