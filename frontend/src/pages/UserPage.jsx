import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import UserMovies from '../components/userpage/UserMovies'


//Page for Any profile not belonging to the current user 
const UserPage = () => {
  return (
    <>
        <Header/>
        <UserMovies/>
        <Footer/>
    </>
  )
}

export default UserPage