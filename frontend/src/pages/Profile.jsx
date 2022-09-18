import React, {useState, useEffect} from 'react'
import TopRatedMovies from '../components/homeone/TopRatedMovies'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios";
import { getMyMovies } from '../features/movies/movieSlice';
import {Link} from "react-router-dom"
import UserMovies from '../components/profile/UserMovies';
import Header from "../components/Header";

const Profile = () => {
   return (
    <>
      <Header/>
      <UserMovies/>
    </>
   )
}

export default Profile