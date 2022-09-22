import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Menu from "../UpMovieItemMenu";
import { Link } from "react-router-dom";
import axios from "axios";
import { addMovie } from "../../features/movies/movieSlice";

const SearchMovies = () => {
  const [moviesFound, setMoviesFound] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  //returns only the first 4 trending
  const searchMovies = async (e) => {
    e.preventDefault();
    const request = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&query=${searchTerm}`
    );
    const movies = await request.data.results.splice(0, 12);
    setMoviesFound(movies);
    console.log(movies)
  };

  useEffect(() => {
    const awaitMovies = async () => {};
    awaitMovies();
  }, []);

  return (
    <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <form
        className="d-flex flex-column   p-5 justify-content-between align-items-center"
        action=""
      >
        <input
          className="form-input text-center"
          type="text"
          name="searchText"
          placeholder="Movie"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <button
          className="btn d-flex justify-content-center align-items-center mt-5"
          type="submit"
          onClick={searchMovies}
        >
          Search
        </button>
      </form>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-50">
              <h2 className="title">Movies</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8"></div>
        </div>
        <div className="row tr-movie-active">
          {moviesFound.map((elem) => {
            const {
              id,
              poster_path: image,
              title,
              release_date: date,
              quality,
              runtime: duration,
              vote_average: ratings,
              media_type,
            } = elem;

            return (
              <div
                className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer cat-two animate__animated animate__fadeInUp"
                data-wow-delay=".4s"
                data-wow-duration="1.8s"
                key={id}
              >
                <div className="movie-item mb-60">
                  <div className="movie-poster">
                    <Link to={"../movie-details/" + id}>
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
                        <Link to={"../movie-details/" + id}>{title}</Link>
                      </h5>
                      <span className="date">{date.split("-")[0]}</span>
                    </div>
                    <div className="bottom">
                      <ul>
                        <li className="watch">
                          {user ? (
                            <button
                              onClick={() => {
                                dispatch(addMovie({ id, image, title }));
                              }}
                              type="submit"
                              className="btn d-flex justify-content-center align-items-center"
                            >
                              <i className="fas fa-plus" /> Add to My Movies
                            </button>
                          ) : (
                            <Link
                              to="/login"
                              className="btn d-flex justify-content-center align-items-center"
                            >
                              <i className="fas fa-plus" /> Add to My Movies
                            </Link>
                          )}
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

export default SearchMovies;
