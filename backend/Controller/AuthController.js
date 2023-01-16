import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import { createError } from "../Utility/Error.js";
import jwt from 'jsonwebtoken'

export const register=async(req,res,next)=>{
    try {
        const hashedPassword=await bcrypt.hash(req.body.password,10);
        const newUser=new UserModel({
        ...req.body,
          password:hashedPassword 
        })
        await newUser.save();
        res.status(200).json("New User Successfully Created")
    } catch (error) {
        
        next(error)
    }
}

export const login=async(req,res,next)=>{
    try {
        const user=await UserModel.findOne({userName:req.body.userName});
        if(!user) return next(createError(404,"User Not Found"));

        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(404,"Wrong Password or UserName"))

        const token=jwt.sign(
            {id:user._id,isAdmin:user.isAdmin},
            process.env.JWT
        )

        const {password, isAdmin,...otherDetails}=user._doc

        res.cookie("access_token",token,{
            httpOnly:true
        })
        .status(200).json({ details: { ...otherDetails }, isAdmin })
    } catch (error) {
       
        next(error)
    }
}


