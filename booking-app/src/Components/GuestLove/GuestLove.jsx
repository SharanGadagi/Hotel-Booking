import React from 'react'
import './GuestLove.css'
import { guestLoveData } from './GuestLoveData'
import useFetch from '../../Hook/useFetch.js'

const GuestLove = () => {
  const {data,loading,error}=useFetch("http://localhost:8000/api/hotel?featured=true&limit=4")
  //  
  return (
  <>
  <div className="GuestLove">
{loading ? "loading......": <>
    {data.map((item)=>(
    <div className="gl-item" key={item._id}>
    <img src={item.photos[0]} alt="guest img" className='guestImg' />
    <span className="glName"> {item.name}</span>
    <span className="glCity">{item.city} </span>
    <span className="glPrice">Starting from {item.cheapestPrice}</span>

 {item.rating && <div className="glRating">
      <button className="glStar">{item.rating}</button>
      <span className="glComment">Excellent</span>
  </div>}

</div>
    ))}
    </>
}
  </div>
  </>
  )
}

export default GuestLove
