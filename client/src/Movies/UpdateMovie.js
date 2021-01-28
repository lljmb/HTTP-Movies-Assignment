import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from "react-router-dom";




const UpdateMovie = ({ movieList, setMovieList }) => {
    const history = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data);
            })
            .catch(err => {
                console.log('error in form effect: ', err);
            });
    }, []);

    const changeHandler = e => {
        setMovie({ 
            ...movie, 
            [e.target.name]: e.target.value
         });
    };

    const handleUpdateClick = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                setMovieList([...movieList, res.data]);
                history.push('/');
            })
            .catch(err => { 
                console.log('error in update form: ', err)
            });
    };


    return ( 
       <>
            <h1>Update Item</h1>
            <form onSubmit={handleUpdateClick}>
                <input
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='title'
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='director'
                    value={movie.director}
                />  
                <input
                    type='text'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='metascore'
                    value={movie.metascore}
                />
                <input
                    type='text'
                    name='stars'
                    onChange={changeHandler}
                    placeholder='stars'
                    value={movie.stars}
                />       
                <button>Update Movie</button>      
            </form>

        
            
        </>
    )
}

export default UpdateMovie