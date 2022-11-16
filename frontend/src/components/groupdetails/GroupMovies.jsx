import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getGroupMovies} from "../../features/groups/groupSlice";
import { Link } from 'react-router-dom';
import ReactStars from 'react-stars';

const GroupMovies = ({users}) => {
  

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )
   
  const dispatch = useDispatch();
  const url = window.location.href.split("/");

  const [groupMovies, setGroupMovies] = useState([])
  const [groupName, setGroupName] = useState(url[url.length - 1]);
  
  
  useEffect(() => {

    const awaitMovies = async () => {
      const movies = await dispatch(getGroupMovies(groupName));
      console.log(movies.payload)
      setGroupMovies(movies.payload);    
    };
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
              <h2> {groupName} Movies</h2>
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
          {groupMovies && groupMovies?.map((elem) => {
            
            const {
              movieData: {image, title, movieId: id},
              totalRating,
              totalUsers,
              averageRating

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
                        <ReactStars value={(totalRating/totalUsers) || 0} edit={false} count={5} color2={"#c31313"} size={24}/>
                      </li>
                      <li>{totalUsers}</li>
                        
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

export default GroupMovies