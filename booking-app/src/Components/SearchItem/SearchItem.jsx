import React from 'react'
import './SearchItem.css'
import { Link } from 'react-router-dom'

const SearchItem = ({item}) => {
  return (
 <>
 <div className="searchItem">
    <img src={item.photos[0]} />
    <div className="si-details">
    <h1 className="si-title">{item.name}</h1>
        <span className="si-distance">{item.distance} m from Center </span>
        <span className="si-taxi">Free airfort Taxi</span>
        <span className="si-subTitle">Studio Apartment With Ac</span>
        <span className="si-features">{item.desc} </span>
        <span className="si-cancel">Free Cancellation</span>
        <span className="si-cancelSubtitle">You can Cancel later, so lock in this great price today!!</span>
    </div>

    <div className="si-details2">
      {item.rating &&
       <div className="si2-rating">
       <span>Excellent</span>
       <button className="si2-rating-btn">{item.rating} </button>
    </div>
      }
    
     <div className="si2-details2">
<span className="si2-price">{item.cheapestPrice}</span>
<span className="si2-tax">Includes taxes and fees</span>
<Link to={`/hotels/${item._id}`} >
<button className="si2-seeBtn">See Availability</button>
</Link>
     </div>
    </div>
 </div>
 </>
  )
}

export default SearchItem