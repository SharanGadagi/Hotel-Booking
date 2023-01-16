import mongoose from 'mongoose'
const database=async (DATABASE_URL)=>{
 try {
        await mongoose.connect(DATABASE_URL);
        console.log("Database Successfully Connected");
    } catch (error) {
        return console.log(error);
    }
}
export default database;

