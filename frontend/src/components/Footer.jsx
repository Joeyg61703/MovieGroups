import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
        <div className="footer-top-wrap">
          <div className="container">
            <div className="footer-menu-wrap">
              <div className="row align-items-center">
                <div className="col-lg-3">
                  <div className="footer-logo">
                    <Link to="/"><img src="img/logo/logo.png" alt="" /></Link>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="footer-menu">
                    <nav>
                      <ul className="navigation">
                        <li><a href="/index">Home</a></li>
                        <li><a href="/index">Movie</a></li>
                        <li><a href="/index">tv show</a></li>
                        <li><a href="/index">pages</a></li>
                        <li><a href="/pricing">Pricing</a></li>
                      </ul>
                      <div className="footer-search">
                        <form action="/#">
                          <input type="text" placeholder="Find Favorite Movie" />
                          <button><i className="fas fa-search" /></button>
                        </form>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-wrap">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="copyright-text">
                  <p>Copyright © 2022. All Rights Reserved By <a href="/">MovieGroups</a></p>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="payment-method-img text-center text-md-right">
                  <a href="https://www.themoviedb.org/" target="_blank"><img src="img/images/TMDB-small.svg" alt="TMDB" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer