import { Schema } from "mongoose"


let userSchema= Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true

    }


},{timestamp:true})
export default userSchema