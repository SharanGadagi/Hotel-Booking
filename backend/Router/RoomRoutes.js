import express from 'express'
import { createRoom, deleteRoom, getAllRooms, getSingleRoom, updateRoom,roomAvailability } from '../Controller/Room.controller.js';
import { verifyAdmin } from '../Utility/VerifyToken.js';

const roomRoutes =express.Router();

// http://localhost:8000/api/room
// create
roomRoutes.route('/:hotelid').post(verifyAdmin,createRoom);

//get all Hotel
roomRoutes.route('/').get(getAllRooms);

//get single hotel
roomRoutes.route('/:id').get(getSingleRoom);

// update hotel
roomRoutes.route('/:id').put(verifyAdmin,updateRoom);

// delete hotel
roomRoutes.route('/:id/:hotelid').delete(verifyAdmin,deleteRoom);

// room availability
roomRoutes.route('/availability/:id').put(verifyAdmin,roomAvailability);


export default roomRoutes;