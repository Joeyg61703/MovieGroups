import {BrowserRouter as Router, Switch,Route, Routes} from 'react-router-dom';
import Homeone from './pages/Homeone';
import MovieDetail from './components/moviedetails/MovieDetail';
import { useEffect } from "react"
import $ from "jquery";
import Blogs from './pages/Blogs';
import BlogDetails from './pages/BlogDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';



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
      
       <Route exact={true} path="/movie-details/:id" element={<MovieDetail/>}/>
                                 
       <Route exact={true} path="/blog" element={<Blogs/>}/>
  
       <Route exact={true} path="/blog-details" element={<BlogDetails/>}/>

       <Route exact={true} path="/login" element={<Login/>}/>

       <Route exact={true} path="/register" element={<Register/>}/>

       <Route exact={true} path="/profile" element={<Profile/>}/>

       <Route exact={true} path="/search" element={<Search/>}/>
      
      </Routes>
  </Router>

     
      
        
    </div>
  );
}

export default App;
