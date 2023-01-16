import React, { useState } from 'react'
import Header from '../../Components/Header/Header'
import Navbar from '../../Components/Navbar/Navbar'
import './HotelList.css'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import SearchItem from '../../Components/SearchItem/SearchItem'
import useFetch from '../../Hook/useFetch.js'


const HotelList = () => {
  const location=useLocation();
  // console.log(location);
  const [destination, setDestination]=useState(location.state.destinations);
  const [openDate, setOpenDate]=useState(false)
  const [date, setDate]=useState(location.state.date)
  const [persons, setPersons]=useState(location.state.persons)
  const [min,setMin]=useState(undefined);
  const [max,setMax]=useState(undefined)


  const {data,loading,error,reFetch}=useFetch(`http://localhost:8000/api/hotel?city=${destination}&min=${min||0}&max=${max||999}`)


  const handleClick=()=>{
    reFetch();
  }
  return (
  <>
  <Navbar/>
  <Header type="list" />

  <div className="hotelListContainer">
    <div className="hotelListWrapper">
      <div className="hotelListSearch">
<h1 className="hls-title">
Search
</h1>
<div className="hls-Item">
  <label >Destination</label>
  <input type="text" placeholder={destination}  />
</div>
<div className="hls-Item">
  <label >Check-in date</label>
<span onClick={()=>setOpenDate(!openDate)} className="hls-date">{`${format(date[0].startDate, "MM/dd/yyyy")} To ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
{openDate &&  <DateRange 
onChange={(item)=>setDate([item.selection])}
minDate={new Date()}
ranges={date}/>}
</div>

<div className="hls-Item">
  <label >Options</label>
  <div className="hlsItem_container">
  <div className="hlsOptionItem">
    <span className="hlsOptionText">
      Min Price <small>(per night)</small>
    </span>
<input type="number" onChange={(e)=>setMin(e.target.value)} className="hlsOptionInput" />
  </div>
  <div className="hlsOptionItem">
    <span className="hlsOptionText">
      Max Price <small>(per night)</small>
    </span>
<input type="number" onChange={(e)=>setMax(e.target.value)} className="hlsOptionInput" />
  </div>
  <div className="hlsOptionItem">
    <span className="hlsOptionText">
     Adult
    </span>
<input type="number" min={1} className="hlsOptionInput"  placeholder={persons.adult} />
  </div>
  <div className="hlsOptionItem">
    <span className="hlsOptionText">
      Children
    </span>
<input type="number" min={0} className="hlsOptionInput"  placeholder={persons.children} />
  </div>
  <div className="hlsOptionItem">
    <span className="hlsOptionText">
    Room
    </span>
<input type="number" min={1} className="hlsOptionInput" placeholder={persons.room} />
  </div>
  </div>
</div>
<button className="hls-searchBtn" onClick={handleClick} >Search</button>
      </div>
 
      <div className="hotelListResult">

        {
          loading ? "loading.....":<>
          {data.map((item)=>{
         return   <SearchItem item={item} key={item._id} />
          })}
          </>
        }


      </div>
    </div>
  </div>
  </>
  )
}

export default HotelList