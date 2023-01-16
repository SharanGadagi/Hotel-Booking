
import HotelModel from "../Models/HotelModel.js"
import RoomModel from '../Models/RoomModel.js'
import { createError } from "../Utility/Error.js";

// create 
 export const createHotel=async(req,res,next)=>{
    const newHotel=new HotelModel(req.body);
    try {
       const saveHotel= await newHotel.save();
        res.status(200).json(saveHotel)
    } catch (error) {
    next(error)
    }
}

// get all hotel
 export const getAllHotel=async(req,res,next)=>{
    const {min,max,...others}=req.query;
    try {
        const hotels= await HotelModel.find(
            {
                ...others,
            cheapestPrice:{$gt:min ||1 ,$lt:max ||1000 },
 }).limit(req.query.limit);
         res.status(200).json(hotels)
     } catch (error) {
        next(error)
     }
}



// get single hotel
export const getSingleHotel=async(req,res,next)=>{
  const id=req.params.id;
      
  try {
    const singleHotel= await HotelModel.findById(id);
     res.status(200).json(singleHotel)
 } catch (error) {
    next(error)
 }
}


// update hotel
export const updateHotel=async(req,res,next)=>{
    const id=req.params.id;

    try {
       const hotelUpdate=await HotelModel.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
       res.status(200).json(hotelUpdate);
    } catch (error) {
        next(error)
    }
}


// delete hotel
export const deleteHotel=async(req,res,next)=>{
    const id=req.params.id;
      
    try {
      const deleteHotel= await HotelModel.findByIdAndDelete(id);
       res.status(200).json(deleteHotel)
   } catch (error) {
    next(error)
   }
}


//count the hotel by cities
export const countByCity=async(req,res,next)=>{
    const cities = req.query.cities.split(",");
    try {
        const countHotel=await Promise.all(cities.map(city=>{
            // return HotelModel.find({city:city}).length  =>it gives all properties it more expensive
            return HotelModel.countDocuments({city:city})
        }))
        res.status(200).json(countHotel)
    } catch (error) {
        next(error)
    }

}

// count the hotel by type
export const countByType=async(req,res,next)=>{
try {
    const hotelCount=await HotelModel.countDocuments({type:"hotel"});
const apartmentCount=await HotelModel.countDocuments({type:"apartment"});
const resortCount=await HotelModel.countDocuments({type:"resort"});
const villasCount=await HotelModel.countDocuments({type:"villas"});
const cabinsCount=await HotelModel.countDocuments({type:"cabins"});
const restaurantCount=await HotelModel.countDocuments({type:"restaurant"});

res.status(200).json([
    {type:"hotel",count:hotelCount},
    {type:"apartment",count:apartmentCount},
    {type:"resort",count:resortCount},
    {type:"villas",count:villasCount},
    {type:"cabins",count:cabinsCount},
    {type:"restaurant",count:restaurantCount},

])
} catch (error) {
    next(error)
}


}


//get rooms by hotel id
export const getHotelRooms=async(req,res,next)=>{
    try {
        const hotel=await HotelModel.findById(req.params.id);
        const list=await Promise.all(hotel.rooms.map( (room)=>{
            return RoomModel.findById(room)
        })
        )
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }

} 
