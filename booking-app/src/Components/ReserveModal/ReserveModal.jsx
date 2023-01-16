import React, { useContext, useState } from 'react'
import {ImCancelCircle} from 'react-icons/im'
import useFetch from '../../Hook/useFetch.js'
import { SearchContext } from '../../Context/SearchContext.jsx'
import './ReserveModal.css'


const ReserveModal = ({setOpen,hotelId}) => {
  const [selectRooms,setSelectRooms]=useState([])
  const {data,loading,error}=useFetch(`http://localhost:8000/api/hotel/room/${hotelId}`)
  const {date}=useContext(SearchContext)

  const getDateRange=(startDate,endDate)=>{
const start=new Date(startDate);
const end=new Date(endDate);

const dates=new Date(start.getTime())

var dateList=[];

while(data<=end){
  dateList.push(new Date(dates).getTime());
  dates.setDate(dates.getDate()+1)
}
return dateList;
  }

  const allDates= getDateRange(date[0].startDate,date[0].endDate)

  
  const isDateAvailable = (roomNumber) => {
    const isDateFound = roomNumber.unavailableDates.some((date) =>
      allDates.includes(new Date(date).getTime())
    );

    return !isDateFound;
  };


  const handleSelect=(e)=>{
const checked=e.target.checked;
const value=e.target.value;

//value =>room id

setSelectRooms(checked? [...selectRooms,value]: selectRooms.filter((item)=>item!==value))
  }
  // console.log(selectRooms)

  const handleClick=()=>{

  }
  return (
   <>
<div className="reserve">
    <div className="reserver-container">
<ImCancelCircle size='1.4rem' className='rClose' onClick={()=>setOpen(false)}/>
<span className='sRoom'>Select your room: </span>
{
  data.map((item)=>{
   return <div className="rItem">
      <div className="rInfo">
        <div className="rTitle">{item.title} </div>
        <div className="rDesc">{item.desc} </div>
        <div className="rMax">Max People: <b>{item.maxPeople} </b> </div>
        <div className="rPrice">${item.price} </div>
      </div>
{item.roomNumbers.map((roomNumber)=>{
return  <div className="roomNumbers">
        <label >{roomNumber.number} </label>
        <input type="checkbox" value={roomNumber._id} onChange={handleSelect} disabled={!isDateAvailable(roomNumber)} />
      </div>
})
      }
    </div>
  })
}
<button className="rBtn" onClick={handleClick}>Reserve Now!</button>
    </div>
</div>
   </>
  )
}

export default ReserveModal