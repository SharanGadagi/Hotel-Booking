import React from 'react'
import './City.css'
import { cityData, cityData1 } from './CityData'
import useFetch from '../../Hook/useFetch.js'

const City = () => {
   const {data,loading,error}=useFetch( "http://localhost:8000/api/hotel/countByCity?cities=india,london,canada")
   // console.log(data);
  return (
   
<>

{loading ? ("Loading Please wait.. "):( <> <div className="city">
    {data && cityData.map((item,i)=>(
  <div className="cityItem" key={item.id}>
  <img src={item.img} alt="city images" className='cityImg' />
  <div className="cityTitle">
     <h1 className="city-title1">{item.name} </h1>
     <h2 className="city-title2">{data[item.id]} Properties</h2>
  </div>
 </div>
    ))}
    </div>

    <div className="city">
    {cityData1.map((item)=>(
  <div className="cityItem" key={item.id}>
  <img src={item.img} alt="city images" className='cityImg' />
  <div className="cityTitle">
     <h1 className="city-title1">{item.name} </h1>
     <h2 className="city-title2">{item.properties} Properties</h2>
  </div>
 </div>
    ))}
    </div></>)}
    </>
    
  )}
  export default City