import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import Menu from "../UpMovieItemMenu";
import { LazyLoadImage } from 'react-lazy-load-image-component'; 
import { Link } from "react-router-dom";
import axios from "axios";
import {addMovie} from "../../features/movies/movieSlice";

const TopRatedMovies = () => {
  const [movieType, setMovieType] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const { user,  isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  const dispatch = useDispatch();

  
  //returns only the first 4 trending
  const getTrending = async () => {
    const request = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await request.data.results.splice(0, 12);
    return movies;
  };
  const getTopRated = async () => {
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await request.data.results.splice(0, 12);
    return movies;
  };
  const getNowPlaying = async () => {
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await request.data.results.splice(0, 12);
    return movies;
  };

  useEffect(() => {
    const awaitMovies = async () => {
      const trending = await getTrending();
      const topRated = await getTopRated();
      const nowPlaying = await getNowPlaying();
      
      setTrendingMovies(trending);
      setTopRatedMovies(topRated);
      setNowPlayingMovies(nowPlaying);
      setMovieType(trending);
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
                {movieType === trendingMovies
                  ? "Trending"
                  : movieType === topRatedMovies
                  ? "Top Rated"
                  : movieType === nowPlayingMovies
                  ? "Now Playing"
                  : ""}{" "}
                Movies
              </h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tr-movie-menu-active text-center">
              <button
                className={movieType === trendingMovies ? "active" : ""}
                data-filter="*"
                onClick={() => setMovieType(trendingMovies)}
              >
                Trending
              </button>
              <button
                className={movieType === topRatedMovies ? "active" : ""}
                data-filter=".cat-one"
                onClick={() => setMovieType(topRatedMovies)}
              >
                Top Rated
              </button>
              <button
                className={movieType === nowPlayingMovies ? "active" : ""}
                data-filter=".cat-two"
                onClick={() => setMovieType(nowPlayingMovies)}
              >
                Now Playing
              </button>
            </div>
          </div>
        </div>
        <div className="row tr-movie-active">
          {movieType.map((elem) => {
            const {
              id,
              poster_path: image,
              title,
              release_date: date,

              runtime: duration,
              vote_average: ratings,
            } = elem;

            return (
              <div
                className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two animate__animated animate__fadeInUp" data-wow-delay=".4s" data-wow-duration="1.8s"
                key={id}
              >
                <div className="movie-item mb-60">
                  <div className="movie-poster">
                    <Link to={"movie-details/" + id}>
                      <LazyLoadImage
                        alt={title}
                        height={455}
                        width={400}
                        className="lazy-image"
                        src={
                          image !== null
                            ? `https://image.tmdb.org/t/p/w400${image}`
                            : "https://via.placeholder.com/400x600"
                        }
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
      </div>
    </section>
  );
};

export default TopRatedMovies;
