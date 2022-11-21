import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const GenreList = () => {

    const [genres, setGenres] = useState([])
    

    const getGenres = async () => {
        const genreIds = await axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
          );
          return genreIds
        
    }

    useEffect(() => {
    
        const awaitGenres = async () => {
            const response = await getGenres();
           
            const genreObjectArray = response.data.genres
            let genresList = genreObjectArray.map(object => object.name);
            
            //removed Genres
            genresList = genresList.filter((genre) => genre != "TV Movie");
            
            setGenres(genresList);
          };
          awaitGenres();


    }, [])
    
  return (
    <section
    className="top-rated-movie tr-movie-bg"
    style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
  >
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="section-title text-center mb-50">
        {genres?.map((genre) => {
          
            return (
                <Link key={genre} onClick={()=>{window.location.href=`/genre/${genre.toLowerCase()}`}}>
                <h1 className="genre-name">{genre}</h1> 
                </Link>
            )
        })}
        </div>
      </div>
      </div>
      </div>
    </section>
  )
}

export default GenreList