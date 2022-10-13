import {BrowserRouter as Router, Switch,Route, Routes} from 'react-router-dom';
import Homeone from './pages/Homeone';
import MovieDetail from './components/moviedetails/MovieDetail';
import { useEffect } from "react"
import $ from "jquery";
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Groups from './pages/Groups';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import GroupDetails from './pages/GroupDetails';
import Genre from './pages/Genre';
import UserPage from './pages/UserPage';


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
                                 
       <Route exact={true} path="/login" element={<Login/>}/>

       <Route exact={true} path="/register" element={<Register/>}/>

       <Route exact={true} path="/profile" element={<Profile/>}/>

       <Route exact={true} path="/search" element={<Search/>}/>

       <Route exact={true} path="/groups" element={<Groups/>}/>

       <Route exact={true} path="/groups/:name" element={<GroupDetails/>}/>

       <Route path="/user/:name" element={<UserPage/>}/>

       <Route path="/genre/:genre" element={<Genre/>}/>
      
      </Routes>
  </Router>
  <ToastContainer/>
     
      
        
    </div>
  );
}

export default App;
