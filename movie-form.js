import React,{useState} from 'react';
import API from '../API/api-services'

const MovieForm = (props) => {
    const [title,settitle] =useState(props.movie.title);
    const [description,setdescription] =useState(props.movie.description);
    const updateclicked = () =>{
        API.updateMovie(props.movie.id,{title , description})
        .then(resp =>props.updateMovie(resp));
    }

    const createclicked = () =>{
        API.createMovie({title , description})
        .then(resp =>props.createnewmovie(resp));
    }
    return (
        <React.Fragment>
        {props.movie ? (
        <div>
            <table style ={{width:"70%",marginTop:"20%",marginLeft :'auto',marginRight :'auto'}}>
                <tbody>
                    <tr style = {{textAlign: 'left'}}>
                        <td style ={{width:'30%',fontSize:"23px"}}><label htmlFor = "title">Title:</label></td>
                        <td style ={{width:'70%'}}><input style ={{width:'250px',height:'25px'}} id="title" type='text' placeholder={'title'} value = {title} onChange={evt => settitle(evt.target.value)}></input></td>
                    </tr><br></br>
                    <tr style = {{textAlign: 'left'}}>
                        <td style ={{width:'30%',fontSize:"23px"}}><label htmlFor = "description">Description:</label></td>
                        <td style ={{width:'70%'}}><textarea style ={{width:'250px',height:'200px'}} id="description" type='text' placeholder={'description'} value = {description} onChange={evt => setdescription(evt.target.value)}></textarea></td>
                    </tr>
                </tbody>   
           </table><br></br>
           {props.movie.id ? <button style ={{width:'20%',height:'8%'}}  onClick = {updateclicked}>Update</button> : 
                            <button style ={{width:'20%',height:'8%'}} onClick = {createclicked}>Create</button> }
        </div>
        ) : null}
        </React.Fragment>
    );
};

export default MovieForm;