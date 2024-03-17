import { User } from "../schema/models.js"


export let createUser= async(req,res)=>{
    let data=req.body
    try {
        let result=await User.create(data)
    console.log(req.body)
    res.json({success:true,message:"user create successfully",data:result})
    
    
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
    }

export let readAllUser = async(req,res)=>{
    try {
        let result=await User.find({})
        res.json({success:true,message:"user read successfully",data:result})
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
    }
    
    }
    export let readById=async(req,res)=>{
        let id=req.params.id
       try {
        let result=await User.findById(id)
        res.json({
            success:true,
            message:"user read successfully",
            data:result
        }) 
       } catch (error) {
        res.json({
            success:false,
            message:error.message
        })
        
       }
        }
         export let updateUser=async(req,res)=>{
            let id=req.params.id
            let data=req.body
            try {
                
            let result=await User.findByIdAndUpdate(id,data,{new:true})
            res.json({
                success:true,
                message:"User updated successfully",
                data:result
            })
            } catch (error) {
                res.json({ 
                    success:false,
                    message:error.message
                })
               
                
            }
            
                }
                export let deleteUser=async(req,res)=>{
                    let id=req.params.id
                    try {
                        let result=await User.findByIdAndDelete(id)
                        res.json({success:true,message:"user deleted successfully",data:result})
                        
                    } catch (error) {
                        res.json({
                            success:false,
                            message:error.message
                        })
                    }
                    
                    }