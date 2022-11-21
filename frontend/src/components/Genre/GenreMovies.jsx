import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Menu from "../UpMovieItemMenu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import {addMovie} from "../../features/movies/movieSlice";
import PageNavBar from "./PageNavBar";

// TESTING

const GenreMovies = () => {
  const [genreMovies, setGenreMovies] = useState([]);

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = window.location.href.split("/");
  const lastPartOfUrl = url[url.length - 1];
  let pageNumber, genreName;

  if(lastPartOfUrl == "")
    pageNumber = 1;

  if(!Number.isNaN(lastPartOfUrl/1)){
    pageNumber = lastPartOfUrl;
    genreName = url[url.length - 2];
  }else{
    pageNumber = 1;
    genreName = lastPartOfUrl;
  }

  if(pageNumber > 50 || pageNumber < 1){
    navigate("/404");
  }

    genreName = genreName[0].toUpperCase() + genreName.substring(1).toLowerCase();
    if(genreName == "Science%20fiction") genreName = "Science Fiction"
    

  const getGenreMovies = async () => {

    const genreIds = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}`
    );
   
    let currentGenreId = null;

    const getGenreId = () => {
      try{
        
      currentGenreId = genreIds.data.genres.filter(genre => {
          return genreName === genre.name
        })[0].id;

       
      }catch(error){
        navigate("/404");
      }
    }

    getGenreId();


    if(!currentGenreId){
      return 404;
    }


    const request = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${pageNumber}&with_genres=${currentGenreId}`
    );
    const movies = await request.data.results;
    return movies
  };
  

  useEffect(() => {
    const awaitMovies = async () => {
      const movies = await getGenreMovies();
      setGenreMovies(movies);
    };
    awaitMovies();
  }, []);

  return (
    <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-50">
              <h2 className="title">
                {genreName} Movies
              </h2>
            </div>
          </div>
        </div>
        
        <PageNavBar pageNumber={Number(pageNumber)} genre={genreName.toLowerCase()}/>
        
        <div className="row tr-movie-active mt-4">
          {genreMovies.map((elem) => {
            const {
              id,
              poster_path: image,
              title,
              release_date: date,
              vote_average: ratings
            } = elem;

            return (
              <div
                className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two animate__animated animate__fadeInUp" data-wow-delay=".4s" data-wow-duration="1.8s"
                key={id}
              >
                <div className="movie-item mb-60">
                  <div className="movie-poster">
                    <Link to={"/movie-details/" + id}>
                      <img
                        src={
                          image !== null
                            ? `https://image.tmdb.org/t/p/w400${image}`
                            : "https://via.placeholder.com/400x600"
                        }
                        alt={title}
                      />
                    </Link>
                  </div>
                  <div className="movie-content">
                    <div className="top">
                      <h5 className="title">
                      <Link to={"movie-details/" + id}>{title}</Link>
                      </h5>
                      <span className="date">{date.split("-")[0]}</span>
                    </div>
                    <div className="bottom">
                      <ul>
                      <li className="watch">
                        {user ? (
                          <button onClick={()=>{
                            dispatch(addMovie({id, image, title}))
                          }}
                          type="submit" className="btn d-flex justify-content-center align-items-center">
                            <i className="fas fa-plus" /> Add to My Movies
                          </button>
                        ) :   
                        (<Link to="/login" className="btn d-flex justify-content-center align-items-center">
                            <i className="fas fa-plus" /> Add to My Movies
                          </Link>)}
                      </li>
                        <li>
                          <span className="rating">
                            <i className="fas fa-thumbs-up" />
                            {ratings.toFixed(1)}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <PageNavBar pageNumber={Number(pageNumber)} genre={genreName.toLowerCase()}/>

      </div>
    </section>
  );
};



export default GenreMovies;
