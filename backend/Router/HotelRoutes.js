import express from 'express'
import { createHotel, deleteHotel, getAllHotel, getSingleHotel, updateHotel,countByCity,countByType, getHotelRooms } from '../Controller/HotelController.js';
import {verifyAdmin} from '../Utility/VerifyToken.js'

const hotelRoutes =express.Router();

// create
hotelRoutes.route('/').post(verifyAdmin,createHotel);

//get all Hotel
hotelRoutes.route('/').get(getAllHotel);

//get single hotel
hotelRoutes.route('/find/:id').get(getSingleHotel);

// update hotel
hotelRoutes.route('/:id').put(verifyAdmin,updateHotel);

// delete hotel
hotelRoutes.route('/:id').delete(verifyAdmin,deleteHotel);

//count the hotels in cities
hotelRoutes.route('/countByCity').get(countByCity);

//count the hotels by type
hotelRoutes.route('/countByType').get(countByType);

// get rooms by hotel
hotelRoutes.route('/room/:id').get(getHotelRooms)

export default hotelRoutes;

