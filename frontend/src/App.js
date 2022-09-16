import {BrowserRouter as Router, Switch,Route, Routes} from 'react-router-dom';
import Homeone from './pages/Homeone';
import Movie from './pages/Movie';
import MovieDetail from './components/moviedetails/MovieDetail';
import TvSeries from './pages/TvSeries';
import { useEffect } from "react"
import $ from "jquery";
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import Register from './pages/Register';



function App() {

  
  useEffect(()=>{
    function preloader() {
      $('#preloader').delay(0).fadeOut();
    };
    $(window).on('load', function () {
      preloader();
      
     
    }, );
  })
  return (
    <div className="App">
     <Router>
       
      <Routes>
       <Route exact={true} path="/" element={<Homeone/>}/>
    
       <Route exact={true} path="/movie" element={<Movie/>}/>
      
       <Route exact={true} path="/movie-details/:id" element={<MovieDetail/>}/>
                  
       <Route exact={true} path="/tv-show" element={<TvSeries/>}/>
                
       <Route exact={true} path="/blog" element={<Blogs/>}/>
  
       <Route exact={true} path="/blog-details" element={<BlogDetails/>}/>

       <Route exact={true} path="/login" element={<Login/>}/>

       <Route exact={true} path="/register" element={<Register/>}/>
      
      </Routes>
  </Router>

     
      
        
    </div>
  );
}

export default App;
