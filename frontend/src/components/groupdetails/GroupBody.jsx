import React, {useState, useEffect} from 'react'
import GroupMovies from './GroupMovies';
import GroupUsers from './GroupUsers';
import { useDispatch, useSelector } from 'react-redux';
import { leaveGroup } from '../../features/groups/groupSlice';
import { useNavigate } from 'react-router-dom';
import { getGroupData } from '../../features/groups/groupSlice';

import Popup from "../Popup";
const GroupBody = () => {
  const {user, isLoading} = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState("users");
  const [users, setUsers] = useState([]);
  const [groupData, setGroupData] = useState({});
  const [userInGroup, setUserInGroup] = useState(false);
    const handleClick = (state) => {
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

    const showMenu = () => {
      const popup = document.getElementById("group-popup");
        popup.classList.remove("hidden");
    }
    
    const url = window.location.href.split("/");
    let groupName = url[url.length - 1];
    groupName = groupName.replaceAll("%20", " ");
    groupName = groupName.split(" ").map(word => word[0].toUpperCase() + word.substring(1).toLowerCase()).join(" ");
    console.log(groupName)
    let inGroup = false;

    const getData = async () => {
      const data = await dispatch(getGroupData(groupName));
      const {group, userArray} = data.payload;
      
     setUserInGroup(userArray.filter(e => e._id == user._id).length > 0);
      
      setGroupData(group);
      setUsers(userArray);
      
    }
  
    useEffect(()=>{
      
      const awaitData = async () => {
        await getData();
      }
  
      awaitData();
    }, []);


    if(isLoading)
      return null
      
  return (
    <div>
        <Popup type="group" groupUsers={users} groupData={groupData} secondButton="Leave Group" secondButtonFunction={()=>{
             dispatch(leaveGroup(groupName));
             navigate("/groups");
          }} />
        <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
      <div className="container">
            <h1 className="title text-center">{groupName}</h1>
        <div className="row justify-content-center">
            <li className={"mr-5 bg-transparent sub-nav users sub-nav-active"} onClick={()=>{handleClick("users")}}>Users</li>
            <li className={"bg-transparent sub-nav movies"} onClick={()=>{handleClick("movies")}}>Movies</li>
        </div>
        {userInGroup && (
        <div className=" mt-4 row justify-content-center">
          <button className="btn" onClick={()=>{
             showMenu();
          }}>Leave Group</button>
          </div>
        )}
        {currentPage === "users" ? <GroupUsers groupData={groupData} users={users}/> : <GroupMovies users={users}/>}
        </div>

    </section>

    </div>
  )
}

export default GroupBody