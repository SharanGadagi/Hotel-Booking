import Jwt from "jsonwebtoken";
import { createError } from "../Utility/Error.js";

export const verifyToken=async(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token) return next(createError(401,"You are not Authenticated"));

    Jwt.verify(token,process.env.JWT,(error,user)=>{
        if(error) return next(createError(403,"Token is not Valid!"));
        req.user=user;
        next();
    })
}


//login user and admin
export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin){
            next();
        }else{ 
            return next(createError(403,"You are not Authorized"))
        }
    })
}

//only admin
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next();
        }else{
            return next(createError(403,"You are not Admin"))
        }
    })
}