import React,{ useEffect } from 'react'
import "magnific-popup";
import $ from "jquery";
import { Link } from 'react-router-dom';
import 'animate.css';


const Banner = () => {


  return (
    <section className="banner-area banner-bg" style={{backgroundImage:'url("../img/banner/banner_bg01.jpg")'}}>
    <div className="container custom-container">
      <div className="row">
        <div className="col-xl-6 col-lg-8">
       
         <div className="banner-content ">
            <h6 className="sub-title animate__animated animate__fadeInUp" data-wow-delay=".2s" data-wow-duration="1.8s">MovieGroups</h6>
            <h2 className="title animate__animated animate__fadeInUp" data-wow-delay=".4s" data-wow-duration="1.8s">Rate <span>Movies</span>, TVs Shows, &amp; More.</h2>
            <div className="banner-meta animate__animated animate__fadeInUp" data-wow-delay=".6s" data-wow-duration="1.8s">
            
            </div>
            <Link to="/register" className="banner-btn btn  wow fadeInUp" data-wow-delay=".8s" data-wow-duration="1.8s">
              <i className="fas" /> Get Started</Link>
          </div>
         
        </div>
      </div>
    </div>
  </section>
  )
}

export default Banner