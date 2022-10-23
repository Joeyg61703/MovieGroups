import React, {useState, useEffect} from 'react'
import GroupMovies from './GroupMovies';
import GroupUsers from './GroupUsers';

const GroupBody = () => {

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
        {currentPage === "users" ? <GroupUsers/> : <GroupMovies/>}
        </div>

    </section>

    </div>
  )
}

export default GroupBody