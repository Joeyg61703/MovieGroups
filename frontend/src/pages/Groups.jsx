import React, {useEffect} from 'react'
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

  return (
    <>
    <Header/>
    <main  className="top-rated-movie tr-movie-bg full"
    style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}>
        <CreateGroupForm/>
        <JoinGroupForm/>
        <UserGroups/>
        {/* <AllGroups/> */}
    </main>
    <Footer/>
    </>
  )
}

export default Groups