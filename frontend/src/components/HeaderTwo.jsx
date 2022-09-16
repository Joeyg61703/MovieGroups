import React,{ useEffect } from 'react';
import $ from "jquery";


const HeaderTwo = () => {
  useEffect(()=>{




    /*=============================================
      =    		Mobile Menu			      =
    =============================================*/
    //SubMenu Dropdown Toggle
    if ($('.menu-area li.menu-item-has-children ul').length) {
      $('.menu-area .navigation li.menu-item-has-children').append('<div class="dropdown-btn"><span class="fas fa-angle-down"></span></div>');
    }
    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {
    
      var mobileMenuContent = $('.menu-area .main-menu').html();
      $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
    
      //Dropdown Button
      $('.mobile-menu li.menu-item-has-children .dropdown-btn').on('click', function () {
        $(this).toggleClass('open');
        $(this).prev('ul').slideToggle(500);
      });
      //Menu Toggle Btn
      $('.mobile-nav-toggler').on('click', function () {
        $('body').addClass('mobile-menu-visible');
      });
    
      //Menu Toggle Btn
      $('.menu-backdrop, .mobile-menu .close-btn').on('click', function () {
        $('body').removeClass('mobile-menu-visible');
      });
    }
    
    /*=============================================
      =     Menu sticky & Scroll to top      =
    =============================================*/
    $(window).on('scroll', function () {
      var scroll = $(window).scrollTop();
      if (scroll < 245) {
        $("#sticky-header").removeClass("sticky-menu");
        $('.scroll-to-target').removeClass('open');
    
      } else {
        $("#sticky-header").addClass("sticky-menu");
        $('.scroll-to-target').addClass('open');
      }
    });
    
    
    /*=============================================
      =    		 Scroll Up  	         =
    =============================================*/
    if ($('.scroll-to-target').length) {
      $(".scroll-to-target").on('click', function () {
        var target = $(this).attr('data-target');
        // animate
        $('html, body').animate({
          scrollTop: $(target).offset().top
        }, 1000);
    
      });
    }
    
      },[])
  return (
    <header className="header-style-two">
    <div className="header-top-wrap">
      <div className="container custom-container">
        <div className="row align-items-center">
          <div className="col-md-6 d-none d-md-block">
            <div className="header-top-subs">
              <p>Movflx One Month Free <span>Subscription !</span></p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="header-top-link">
              <ul className="quick-link">
                <li><a href="/#">About Us</a></li>
                <li><a href="/#">FAQS</a></li>
              </ul>
              <ul className="header-social">
                <li><a href="/#"><i className="fab fa-facebook-f" /></a></li>
                <li><a href="/#"><i className="fab fa-twitter" /></a></li>
                <li><a href="/#"><i className="fab fa-vimeo-v" /></a></li>
                <li><a href="/#"><i className="fab fa-dribbble" /></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="sticky-header" className="menu-area">
      <div className="container custom-container">
        <div className="row">
          <div className="col-12">
            <div className="mobile-nav-toggler"><i className="fas fa-bars" /></div>
            <div className="menu-wrap">
              <nav className="menu-nav show">
                <div className="logo">
                  <a href="/#">
                    <img src="img/logo/logo.png" alt="Logo" />
                  </a>
                </div>
                <div className="navbar-wrap main-menu d-none d-lg-flex">
                  <ul className="navigation">
                    <li className="active menu-item-has-children"><a href="/#">Home</a>
                      <ul className="submenu">
                        <li><a href="/#">Home One</a></li>
                        <li className="active"><a href="/index-2">Home Two</a></li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children"><a href="/#">Movie</a>
                      <ul className="submenu">
                        <li><a href="/movie">Movie</a></li>
                        <li><a href="/movie-details">Movie Details</a></li>
                      </ul>
                    </li>
                    <li><a href="/tv-show">tv show</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                    <li className="menu-item-has-children"><a href="/#">blog</a>
                      <ul className="submenu">
                        <li><a href="/blog">Our Blog</a></li>
                        <li><a href="/blog-details">Blog Details</a></li>
                      </ul>
                    </li>
                    <li><a href="/contact">contacts</a></li>
                  </ul>
                </div>
                <div className="header-action d-none d-md-block">
                  <ul>
                    <li className="d-none d-xl-block">
                      <div className="footer-search">
                        <form action="#">
                          <input type="text" placeholder="Find Favorite Movie" />
                          <button><i className="fas fa-search" /></button>
                        </form>
                      </div>
                    </li>
                    <li className="header-lang">
                      <form action="#">
                        <div className="icon"><i className="flaticon-globe" /></div>
                        <select id="lang-dropdown">
                          <option value>En</option>
                          <option value>Au</option>
                          <option value>AR</option>
                          <option value>TU</option>
                        </select>
                      </form>
                    </li>
                    <li className="header-btn"><a href="/#" className="btn">Sign In</a></li>
                  </ul>
                </div>
              </nav>
            </div>
            {/* Mobile Menu  */}
            <div className="mobile-menu">
              <div className="close-btn"><i className="fas fa-times" /></div>
              <nav className="menu-box">
                <div className="nav-logo"><a href="/#"><img src="img/logo/logo.png" alt=""  /></a>
                </div>
                <div className="menu-outer">
                  {/*Here Menu Will Come Automatically Via Javascript / Same Menu as in Header*/}
                </div>
                <div className="social-links">
                  <ul className="clearfix">
                    <li><a href="/#"><span className="fab fa-twitter" /></a></li>
                    <li><a href="/#"><span className="fab fa-facebook-square" /></a></li>
                    <li><a href="/#"><span className="fab fa-pinterest-p" /></a></li>
                    <li><a href="/#"><span className="fab fa-instagram" /></a></li>
                    <li><a href="/#"><span className="fab fa-youtube" /></a></li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="menu-backdrop" />
            {/* End Mobile Menu */}
          </div>
        </div>
      </div>
    </div>
  </header>
  )
}

export default HeaderTwo