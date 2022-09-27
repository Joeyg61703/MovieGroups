import React from 'react'
import Footer from '../components/Footer'
import AllGroups from '../components/groups/AllGroups'
import CreateGroup from '../components/groups/CreateGroup'
import UserGroups from '../components/groups/UserGroups'
import Header from '../components/Header'

const Groups = () => {
  return (
    <>
    <Header/>
    <main  className="top-rated-movie tr-movie-bg full"
    style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}>
        <CreateGroup/>
        <UserGroups/>
        {/* <AllGroups/> */}
    </main>
    <Footer/>
    </>
  )
}

export default Groups