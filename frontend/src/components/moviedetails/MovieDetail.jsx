import React, { useState, useEffect } from "react";
import Footer from "../Footer";
import Header from "../Header";
import axios from "axios";
import {addMovie} from "../../features/movies/movieSlice";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const MovieDetail = () => {
  
  const [movieData, setMovieData] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [movieId, setMovieId] = useState(window.location.href.split("/")[window.location.href.split("/").length - 1]);
  const [currentUrl, setCurrentUrl] = useState(""); 
  const {user} = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();

  const getData = async () => {
    const url = window.location.href.split("/");
    const currentMovieId = url[url.length - 1];
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_API_KEY}`
    );
    setMovieId(currentMovieId)
    setCurrentUrl(window.location.href);
    const movies = await request.data;
    
    return movies;
  };

  const getRecommended = async () => {
    const request = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.REACT_APP_API_KEY}`
    );
    const movies = await request.data.results.splice(0,4);
    //console.log("Recommended: ", movies)
    return movies;
  };

  useEffect(() => {
   
    const awaitMovies = async () => {
  
      const movie = await getData();
      const recommendations = await getRecommended();
      //console.log(movie);
      setMovieData(movie);
      setRecommendedMovies(recommendations);
    };
    awaitMovies();
    //console.log(movieId === location.href.split("/")[location.href.split("/").length - 1])
  }, [movieId]);

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
                      movieData.poster_path !== null
                        ? `https://image.tmdb.org/t/p/w300${movieData.poster_path}`
                        : "https://via.placeholder.com/300x500"
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
                          <Link key={genre.id} to={"../genre/" + genre.name.toLowerCase()}>
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

        {/* RECOMMENDED SECTION */}
        <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="section-title text-center mb-50">
            <h2 className="title">Recommended</h2>
            </div>
          </div>
        </div>
       
        <div className="row tr-movie-active">
          { recommendedMovies.length ? recommendedMovies.map((elem) => {
            const {
              id,
              poster_path: image,
              title,
              release_date: date,
              quality,
              runtime: duration,
              vote_average: ratings,
              media_type
            } = elem;

            return (
              <div
                className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two animate__animated animate__fadeInUp" data-wow-delay=".4s" data-wow-duration="1.8s"
                key={id}
              >
                <div className="movie-item mb-60">
                  <div className="movie-poster">
                    <Link onClick={()=>{setMovieId(id)}} to={"../../movie-details/" + id}>
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
                      <Link onClick={()=>{setMovieId(id)}} to={"../../movie-details/" + id}>{title}</Link>
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
          }) : <div className="container text-center mt-100"><h3>No Movies Found</h3></div>}
        </div>
      </div>
    </section>
        {/* {Possible Review Section} */}
      </main>
     
      <Footer />
    </div>
  );
};

export default MovieDetail;
