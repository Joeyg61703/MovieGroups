import React, {useState, useEffect} from 'react'
import GroupMovies from './GroupMovies';
import GroupUsers from './GroupUsers';
import { useDispatch, useSelector } from 'react-redux';
import { leaveGroup } from '../../features/groups/groupSlice';
import { useNavigate } from 'react-router-dom';

const GroupBody = () => {
  const {user} = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState("users");

    function handleClick(state){
      setCurrentPage(state);
      const userButton = document.querySelector(".users");
      const movieButton = document.querySelector(".movies");
      if(state == "users"){
        userButton.classList.add("sub-nav-active");
        movieButton.classList.remove("sub-nav-active");
      }else{
        userButton.classList.remove("sub-nav-active");
        movieButton.classList.add("sub-nav-active");
      }
    }
    
    const url = window.location.href.split("/");
    const groupName = url[url.length - 1];
      
  return (
    <div>
          
        <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
        <div className="row justify-content-center">
            <li className={"mr-5 bg-transparent sub-nav users sub-nav-active"} onClick={()=>{handleClick("users")}}>Users</li>
            <li className={"bg-transparent sub-nav movies"} onClick={()=>{handleClick("movies")}}>Movies</li>
        </div>
        <div className=" mt-4 row justify-content-center">
          <button className="btn" onClick={()=>{
             dispatch(leaveGroup(groupName));
             navigate("/groups");
          }}>Leave Group</button>
          </div>
        {currentPage === "users" ? <GroupUsers/> : <GroupMovies/>}
        </div>

    </section>

    </div>
  )
}

export default GroupBody