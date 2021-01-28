import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateMovie from './UpdateMovie';


function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();
  const { id } = useParams();
  

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  // function for deleting movies
  const deleteMovie = () => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        push('/')
      })
      .catch(err => {
        console.log('deletion error: ', err)
    })
  }
   
  // click handler for button that routes to new route 
  const updateMovie = () => {
    console.log('here');
    push(`/update-movie/${id}`)
  }

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      {/* button */}
      <div className='update-button' onClick={updateMovie}>
       Update
      </div>
      <div onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
