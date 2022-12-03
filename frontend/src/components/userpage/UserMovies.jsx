import React, {useState, useEffect} from 'react'
import TopRatedMovies from '../homeone/TopRatedMovies'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { getUserMovies } from '../../features/movies/movieSlice';
import {Link, useNavigate} from "react-router-dom"
import ReactStars from 'react-stars'

const UserMovies = () => {
    const {user} = useSelector(
        (state) => state.auth
      )

    
    const navigate = useNavigate();  
    const dispatch = useDispatch();

    const [userMovies, setUserMovies] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    let viewedUser; 

    const awaitMovies = async () => {
      const urlArr = location.href.split("/");
      const userName = urlArr[urlArr.length-1];
      
      if(user && userName === user.name) navigate("/profile");

      const data = await dispatch(getUserMovies(userName))
      
      const movies = data.payload.movies;
      const viewedUser = data.payload.user;
     
      setUserMovies(movies);
      setCurrentUser(viewedUser)
    };

    useEffect(() => {
      awaitMovies();   
      
    }, []);
    
    
  return (
    
    <div>
        <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-50">
              <h2> {currentUser && currentUser.name} Movies</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tr-movie-menu-active text-center">
             
            </div>
          </div>
        </div>
      <div className="row tr-movie-active">
          {userMovies && userMovies.map((elem) => {
            const {
              movieId: id,
              image,
              title,
              users,

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
                          image !== undefined
                            ? `https://image.tmdb.org/t/p/w400${image}`
                            : "https://via.placeholder.com/400"
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
                     
                    </div>
                    <div className="bottom">
                      <ul>
                      <li className="watch">
                        {currentUser && <ReactStars value={users.filter((obj) => obj.user === currentUser._id)[0].rating || 0} count={5} edit={false}  color2={"#c31313"} size={24}/>}
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
    </div>
  )
}

export default UserMovies