import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section
    className="top-rated-movie tr-movie-bg full"
    style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}>
     <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title text-center mb-25">
            <h2 className="title title-red">Login</h2>
                <Link to="/" className="underline text-white">Back to home</Link>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="tr-movie-menu-active text-center">
            <form  className="d-flex flex-column border border-dark shadow rounded p-5 justify-content-between align-items-center" action="">
                <label htmlFor="email"><h2>Email</h2></label>           
                <input className="form-input text-center" type="email" id="email" name="email" placeholder="johnsmith@gmail.com"/>
                <label className="mt-5" htmlFor="password"><h2>Password</h2></label>           
                <input className="form-input text-center" type="password" id="password" name="password" />           
                <button className="form-button d-flex justify-content-center align-items-center mt-5 w-100 " type="submit">
                        Login                        
                </button>
                <p>Don't have an account? <br/>Register <Link to="/register"><span className="title-red">here</span></Link></p>
            </form>        
            </div>
          </div>
        </div>
     </div>
    </section>
  )
}

export default Login