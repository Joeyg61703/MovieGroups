import React from 'react';
import Banner from '../components/homeone/Banner';
import TopRatedMovies from '../components/homeone/TopRatedMovies';
import Footer from '../components/Footer';
import Header from "../components/Header";
import { useSelector, useDispatch } from 'react-redux';

const Homeone = () => {
  const {user} = useSelector((state) => state.auth);
  return (
  <div>
      <Header/>
    <main>
        {!user && <Banner/>}
        <TopRatedMovies/>

    </main>
      <Footer/>
  </div>

  )
}

export default Homeone
