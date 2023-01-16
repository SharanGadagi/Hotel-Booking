import express from 'express'
import { deleteUser, getAllUsers, getSingleUser, updateUser } from '../Controller/UserController.js';
import { verifyAdmin, verifyToken, verifyUser } from '../Utility/VerifyToken.js';

const userRoutes =express.Router();

 // http://localhost:8000/api/user/verifytoken
//verify token
// userRoutes.get('/verifytoken', verifyToken,(req,res,next)=>{
//     res.send("Authenticated")
// })

 // http://localhost:8000/api/user/verifyuseroradmin
//verify user or admin
// userRoutes.get('/verifyuseroradmin/:id', verifyUser,(req,res,next)=>{
//     res.send("Authenticated user or admin")
// })

 // http://localhost:8000/api/user/verifyadmin
//verify admin
// userRoutes.get('/verifyadmin/:id', verifyAdmin,(req,res,next)=>{
//     res.send("Authenticated admin only")
// })


// userRoutes.get("/checkauthentication", verifyToken, (req,res,next)=>{
//   res.send("hello user, you are logged in")
// })

// userRoutes.get("/checkuser/:id", verifyUser, (req,res,next)=>{
//   res.send("hello user, you are logged in and you can delete your account")
// })

// userRoutes.get("/checkadmin/:id", verifyAdmin, (req,res,next)=>{
//   res.send("hello admin, you are logged in and you can delete all accounts")
// })


// http://localhost:8000/api/user
//get all Hotel
userRoutes.route('/').get(verifyAdmin,getAllUsers);

 // http://localhost:8000/api/user/:id
//get single hotel
userRoutes.route('/:id').get(verifyUser,getSingleUser);

 // http://localhost:8000/api/user/:id
// update hotel
userRoutes.route('/:id').put(verifyUser,updateUser);

 // http://localhost:8000/api/user/:id
 //delete user
userRoutes.route('/:id').delete(verifyUser,deleteUser);

export default userRoutes;