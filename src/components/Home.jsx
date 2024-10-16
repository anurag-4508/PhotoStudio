import React from 'react'
import Header from './Header'
import About from './About'
import Portfolio from './Portfolio'
import Services from './Services'
import Gallery from './Gallery'
import Footer from './Footer'
import Instagram from './Instagram'
import Blog from './Blog'

const Home = () => {
  return (
    <div>
      <Header/>
      <About/>
      <Portfolio/>
      <Services />
      <Gallery />
      <Blog />
      <Instagram />
      <Footer/>
    </div>
  )
}

export default Home
