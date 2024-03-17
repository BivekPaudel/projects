import mongoose from "mongoose";
import { dbUrl } from "../../constant.js";

let connectToMongoDB = async() => {

try{
    await mongoose.connect(dbUrl)
 
     console.log(`application is connected to mongoDB successfully.`)
}catch (err){
    console.log("unable to connect")
 }
}
 export default connectToMongoDB