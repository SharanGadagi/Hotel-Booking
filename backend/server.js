import express from 'express'

import dotenv from 'dotenv'
dotenv.config();
import database from './db/database.js';
const DATABASE_URL=process.env.DATABASE_URL;
import authRoutes from './Router/Auth.js';
import userRoutes from './Router/UserRoutes.js';
import hotelRoutes from './Router/HotelRoutes.js';
import roomRoutes from './Router/RoomRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
const app=express();

// database
database(DATABASE_URL);

const PORT=process.env.PORT||5000
app.get('/',(req,res)=>{
res.send("Booking")
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())

// Routes Middleware
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/hotel",hotelRoutes);
app.use("/api/room",roomRoutes);


//error
app.use((error,req,res,next)=>{
    const errorStatus=error.status||500;
    const errorMessage=error.message || "Something Went Wrong!!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:error.stack
    })
})

app.listen(PORT,()=>{
    console.log(`app listening on port: http://localhost:${PORT}`)
})