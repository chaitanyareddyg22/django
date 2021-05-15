import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'


function Moviedetails(props){
    let move = props.movieselected;
        const [hilight, sethilight] = useState(-1)
        const highlight = (smpl)=> evt =>{
                sethilight(smpl)
        }

        const rateclicked = (rate) =>(evt)=>{
            fetch(`http://127.0.0.1:8000/api/movies/${move.id}/movie_rate/`,{method:'POST',headers:{
                'Content-Type':'application/json',
                'Authorization':'Token f10a13c092672af3cf7595e117f4bdb96ebcaf40'},
                body:JSON.stringify({strs : rate + 1})
            })
                .then(resp =>resp.json())
                .then(() =>getDetails())
                .catch(error =>console.log(error))
        }
        const getDetails = () =>{
            fetch(`http://127.0.0.1:8000/api/movies/${move.id}/`,{method:'GET',headers:{
                'Content-Type':'application/json',
                'Authorization':'Token f10a13c092672af3cf7595e117f4bdb96ebcaf40'},
            })
                .then(resp => resp.json())
                .then(resp => props.updateMovie(resp))
                .catch(error =>console.log(error))
        }
    return(
    <div>
        { move ? (
            <div>
            <h1 style={{backgroundColor:'#8CC152'}}>Movie Details</h1>
            <h2>{move.title}</h2>
            <p>{move.description}</p>
            <FontAwesomeIcon icon={faStar} className = {move.avg_rating > 0 ?"orange" : "" }/>
            <FontAwesomeIcon icon={faStar} className = {move.avg_rating > 1 ?"orange" : "" }/>
            <FontAwesomeIcon icon={faStar} className = {move.avg_rating > 2 ?"orange" : "" }/>
            <FontAwesomeIcon icon={faStar} className = {move.avg_rating > 3 ?"orange" : "" }/>
            <FontAwesomeIcon icon={faStar} className = {move.avg_rating > 4 ?"orange" : "" }/>
            ({move.no_of_ratings})
            <div className = 'rate-container'>
                <h2>Rate it</h2>
                {[...Array(5)].map((e,i)=>{
                    return <FontAwesomeIcon icon={faStar} className = {hilight >i-1 ?"red" : "" }
                    onMouseEnter ={highlight(i)}
                    onMouseLeave= {highlight(-1)}
                    onClick = {rateclicked(i)}
                    />
                })}
            </div>
        </div>
            )
         : null }
    </div>
    )    
}
export default Moviedetails;