import React, {useState, useEffect} from 'react'
import GroupMovies from './GroupMovies';
import GroupUsers from './GroupUsers';

const GroupBody = () => {

    const [currentPage, setCurrentPage] = useState("users");
    let textColor = "text-success";


  
    
  return (
    <div>
          
        <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
        <div className="row justify-content-center">
            <li className={"mr-5 bg-transparent" + textColor} onClick={()=>{setCurrentPage("users")}}>Users</li>
            <li className={"bg-transparent" + textColor} onClick={()=>{setCurrentPage("movies")}}>Movies</li>
        </div>
        {currentPage === "users" ? <GroupUsers/> : <GroupMovies/>}
        </div>

    </section>

    </div>
  )
}

export default GroupBody