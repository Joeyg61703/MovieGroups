import React from 'react'
import Footer from '../components/Footer'
import CreateGroup from '../components/groups/CreateGroup'
import UserGroups from '../components/groups/UserGroups'
import Header from '../components/Header'

const Groups = () => {
  return (
    <>
    <Header/>
    <main>
        <CreateGroup/>
        <UserGroups/>
    </main>
    <Footer/>
    </>
  )
}

export default Groups