import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

const Error404 = () => {
  return (
    <div>
        <Header/>
        <section
      className="top-rated-movie tr-movie-bg"
      style={{ backgroundImage: 'url("../../img/bg/tr_movies_bg.jpg")' }}
    >
        <div className="w-full mt-4">
            <h1 className="text-center ">
                <span className="title-red">404</span> Page Not Found
            </h1>
        </div>
        </section>
        <Footer/>
    </div>
  )
}

export default Error404