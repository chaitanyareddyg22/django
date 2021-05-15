import './App.css';
import React,{useState,useEffect} from 'react';
import MovieList from './components/movie-list'
import Moviedetails from './components/movie-details'
import MovieForm from './components/movie-form'


function App() {
  const [movies,setmovies] = useState(['Avatar','Pacific Rim'])
  const [selectedMovie,setselectedMovie] = useState(null)
  const [editMovie,seteditMovie] = useState(null)

  useEffect(()=>{
    fetch('http://127.0.0.1:8000/api/movies/',{method:'GET',headers:{
    'Content-Type':'application/json',
    'Authorization':'Token f10a13c092672af3cf7595e117f4bdb96ebcaf40'}})
    .then(resp =>resp.json())
  .then(resp =>setmovies(resp))
  .catch(error =>console.log(error))
  },[])



  const loadMovie = (movie) =>{
    setselectedMovie(movie)
    seteditMovie(null)
  }

  const editclicked = (movie) =>{
    seteditMovie(movie)
    setselectedMovie(null)
  }
  const updateMovie = (movie) =>{
    const newmovies = movies.map(mov =>{
      if (mov.id === movie.id){
        return movie
      } 
      else{
        return mov
      }
    })
    setmovies(newmovies)
  }
  const Newmovie = () =>{
    seteditMovie({title:'',description:''});
    setselectedMovie(null);
  }
  const createMovie =(movie) =>{
    const newmovies = [...movies,movie];
    setmovies(newmovies)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <div>
        <MovieList movies={movies} Mclick={loadMovie} editclicked={editclicked}/><br></br><br></br>
        <button style={{width :'30%',height :'8%'}} onClick={Newmovie}>ADD New Movie</button>
        </div>
        { selectedMovie ? <Moviedetails movieselected={selectedMovie} updateMovie={loadMovie}/> : null}
        {editMovie ? <MovieForm createnewmovie={createMovie} movie={editMovie} updateMovie={updateMovie}/> : null}
      </div>
    </div>
  );
}

export default App;
