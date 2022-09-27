import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import axios from "axios";
import {addMovie} from "../../features/movies/movieSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const MovieDetail = () => {
  const [movieData, setMovieData] = useState([]);

  const {user} = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();

  const getData = async () => {
    const url = window.location.href.split("/");
    const movieId = url[url.length - 1];
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await request.data;
    return movies;
  };

  useEffect(() => {
    const awaitMovies = async () => {
      const movie = await getData();
      console.log(movie);
      setMovieData(movie);
    };
    awaitMovies();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <section
          className="movie-details-area"
          style={{ backgroundImage: 'url("../../img/bg/movie_details_bg.jpg")' }}
        >
          <div className="container">
            <div className="row align-items-center position-relative">
              <div className="col-xl-3 col-lg-4">
                <div className="movie-details-img">
                  <img
                    src={
                      movieData.poster_path !== undefined
                        ? `https://image.tmdb.org/t/p/w300${movieData.poster_path}`
                        : "https://via.placeholder.com/400"
                    }
                    alt={movieData.title}
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-8">
                <div className="movie-details-content">
                  <h2>{movieData.title}</h2>
                  <div className="banner-meta">
                    <ul>
                      
                      <li className="category">
                        {movieData.genres?.map((genre) => (
                          <Link key={genre.id} to={"../" + genre.name}>
                            {genre.name}
                          </Link>
                        ))}
                      </li>
                      <li className="release-time">
                        <span>
                          <i className="far fa-calendar-alt" />
                          {movieData.release_date}
                        </span>
                        <span>
                          <i className="far fa-clock" />
                          {movieData.runtime}
                        </span>
                      </li>
                    </ul>
                  </div>
                  <p>{movieData.overview}</p>
                  <div className="movie-details-prime d-flex">
                    <ul>
                      {/* <li className="watch">
                        <a className="btn">
                          <i className="fas fa-star" /> Rate Movie
                        </a>
                      </li> */}
                      <li className="watch">
                        {user ? (
                          <button onClick={()=>{
                            let id = movieData.id
                            let image = movieData.poster_path
                            let title = movieData.title 
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
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section></section>
        {/* {Possible Review Section} */}
      </main>
      <Footer />
    </div>
  );
};

export default MovieDetail;
