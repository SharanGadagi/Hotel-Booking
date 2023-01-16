import express from 'express'
import RoomModel from '../Models/RoomModel.js'
import HotelModel from "../Models/HotelModel.js"


export const createRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid;
    const newRoom=new RoomModel(req.body);
    try {
        const savedRoom=await newRoom.save();
        try {
          await HotelModel.findByIdAndUpdate(hotelId,{
            $push:{rooms:savedRoom._id},
          })  
        } catch (error) {
            next(error)
        }
        res.status(201).json(savedRoom)
    } catch (error) {
        next(error)
    }
}

// get all rooms
export const getAllRooms=async(req,res,next)=>{
    
    try {
        const rooms= await RoomModel.find();
         res.status(200).json(rooms)
     } catch (error) {
      next(error)
     }
}



// get single room
export const getSingleRoom=async(req,res,next)=>{
  const id=req.params.id;
      
  try {
    const singleRoom= await RoomModel.findById(id);
     res.status(200).json(singleRoom)
 } catch (error) {
  next(error)
 }
}


// update room
export const updateRoom=async(req,res,next)=>{
  
    const id=req.params.id;

    try {
       const roomUpdate=await RoomModel.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
    
       res.status(200).json(roomUpdate);
    } catch (error) {
      next(error)
    }
}


// delete hotel
export const deleteRoom=async(req,res,next)=>{
    const hotelId=req.params.hotelid;
    const id=req.params.id;
      
    try {
      const deleteRoom= await RoomModel.findByIdAndDelete(id);
      try {
        await HotelModel.findByIdAndUpdate(hotelId,{
          $pull:{rooms:id},
        })  
      } catch (error) {
          next(error)
      }
       res.status(200).json("Room successfully deleted")
   } catch (error) {
    next(error)
   }
}

// roomAvailability
export const roomAvailability=async(req,res,next)=>{
  try {
   // id=> roon no id
    await RoomModel.updateOne(
      {"roomNumbers_id":req.params.id},
      {"roomNumbers.$.unavailableDates":req.body.dates}
    )
  } catch (error) {
    next(error)
  }
}