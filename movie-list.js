import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons';

function MovieList(props){
    const MovieClick = movie => evt =>{
        props.Mclick(movie)
    }
    const editmovie = (movie) =>{
        props.editclicked(movie)
    }
    return(
            <div>
                <h1 style={{backgroundColor:'#8CC152'}}>Movie Name</h1>
                {props.movies && props.movies.map(movie =>{
                    return (
                        <div key = {movie.id}>
                            <table style={{width :'60%',textAlign:"left",marginLeft :'auto',marginRight :'auto'}}>
                                <tbody>
                                    <tr>
                                    <td style={{width:'50%'}}>
                                    <h2 style={{cursor:'pointer'}} onClick={MovieClick(movie)}>{movie.title} </h2>
                                    </td>
                                    <td style={{width:'50%',textAlign:'right'}}>
                                    <FontAwesomeIcon  icon={faEdit} onClick={()  => editmovie(movie)}/> 
                                    <FontAwesomeIcon  icon={faTrash} />
                                    </td>
                                    </tr>
                                </tbody>
                          </table>
                        </div>
                            )
                })}
            </div>
       )} export default MovieList;