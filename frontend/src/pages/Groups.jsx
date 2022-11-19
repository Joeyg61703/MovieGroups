import React, {useEffect, useState} from 'react'
import Footer from '../components/Footer'
import AllGroups from '../components/groups/AllGroups'
import CreateGroupForm from '../components/groups/CreateGroupForm'
import JoinGroupForm from '../components/groups/JoinGroupForm'
import UserGroups from '../components/groups/UserGroups'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Groups = () => {
  const {user} = useSelector(
    (state) => state.auth
  )
  const [currentForm, setCurrentForm] = useState("create");

    function handleClick(state){
      setCurrentForm(state);
      const createFormButton = document.querySelector(".create");
      const joinFormButton = document.querySelector(".join");
      if(state == "create"){
        createFormButton.classList.add("sub-nav-active");
        joinFormButton.classList.remove("sub-nav-active");
      }else{
        createFormButton.classList.remove("sub-nav-active");
        joinFormButton.classList.add("sub-nav-active");
      }
    }

  return (
    <>
    <Header/>
    <main  className="top-rated-movie tr-movie-bg full max-width"
    style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}>
      <div className="row justify-content-center mb-4">
            <li className={"mr-5 bg-transparent sub-nav create sub-nav-active"} onClick={()=>{handleClick("create")}}>CREATE</li>
            <li className={"bg-transparent sub-nav join"} onClick={()=>{handleClick("join")}}>JOIN</li>
        </div>
        {currentForm === "create" ?   <CreateGroupForm/> :<JoinGroupForm/>}
        <UserGroups/>
        {/* <AllGroups/> */}
    </main>
    <Footer/>
    </>
  )
}

export default Groups