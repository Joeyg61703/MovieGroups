import React, {useState, useEffect} from 'react'
import TopRatedMovies from '../components/homeone/TopRatedMovies'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { getMyMovies } from '../features/movies/movieSlice';
import {Link, useNavigate} from "react-router-dom"
import UserMovies from '../components/profile/UserMovies';
import Header from "../components/Header";
import Footer from "../components/Footer";

const Profile = () => {

  const {user} = useSelector(
    (state) => state.auth
  )
  const navigate = useNavigate();
  
  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  }, []);
   return (
    <>
      <Header/>
      <UserMovies/>
      <Footer/>
    </>
   )
}

export default Profile