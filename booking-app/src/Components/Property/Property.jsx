import React from 'react'
import './Property.css'
import { propertyData } from './PropertData'
import useFetch from '../../Hook/useFetch.js'

const Property = () => {
  const {data,loading,error}=useFetch( "http://localhost:8000/api/hotel/countByType")

  return (
 <>
 <div className="propertyList">
  {loading ?("Loading"):(<> 
    {data && propertyData.map((item)=>(
 <div className="propertyItem" key={item.id}>
 <img src={item.img} alt="property img" className='propertyImg' />
 <div className="propertyTitles">
     <h1 className="p-title1">{data[item.id]?.type} </h1>
     <h2 className="p-title2"> {data[item.id]?.count} Properties </h2>
 </div>
</div>
    ))}
    </>
    )}
   
 </div>
 </>
  )
}

export default Property
