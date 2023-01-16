import UserModel from "../Models/UserModel.js";
// get all hotel

export const getAllUsers=async(req,res,next)=>{
    
    try {
        const users= await UserModel.find();
         res.status(200).json(users)
     } catch (error) {
        next(error)
     }
}



// get single hotel
export const getSingleUser=async(req,res,next)=>{
  const id=req.params.id;
      
  try {
    const singleUser= await UserModel.findById(id);
     res.status(200).json(singleUser)
 } catch (error) {
    next(error)
 }
}


// update hotel
export const updateUser=async(req,res,next)=>{
    const id=req.params.id;

    try {
       const userUpdate=await UserModel.findByIdAndUpdate(id,{$set:req.body},{new:true}) 
       res.status(200).json(userUpdate);
    } catch (error) {
        next(error)
    }
}


// delete hotel
export const deleteUser=async(req,res,next)=>{
    const id=req.params.id;
      
    try {
      const deleteUser= await UserModel.findByIdAndDelete(id);
       res.status(200).json("User Successfully Deleted")
   } catch (error) {
    next(error)
   }
}