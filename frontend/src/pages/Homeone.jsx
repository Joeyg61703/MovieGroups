import React from 'react';
import Banner from '../components/homeone/Banner';
import Service from '../components/homeone/Service';
import TopRatedMovies from '../components/homeone/TopRatedMovies';
import TvSerise from '../components/homeone/TvSerise';
import UpcomingMovie from '../components/homeone/UpcomingMovie';
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
        <UpcomingMovie/>
        <Service/>
       
        <TvSerise/>

    </main>
      <Footer/>
  </div>

  )
}

export default Homeone
