import React from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Header from '../../Components/Header/Header'
import City from '../../Components/City/City'
import './Home.css'
import Property from '../../Components/Property/Property'
import GuestLove from '../../Components/GuestLove/GuestLove'
import ContactMail from '../../Components/ContactMail/ContactMail'
import Footer from '../../Components/Footer/Footer'
const Home = () => {
  return (
    <div className='home'>
<Navbar/>
<Header/>
<div className="homeContainer">
  <City/>
 <h1 className="home-title">Browse By Property Type</h1>
 <Property/>
 <h1 className="home-title">Our Guest Love</h1>
 <GuestLove/>
 <ContactMail/>
 <Footer/>
</div>
    </div>
  )
}

export default Home