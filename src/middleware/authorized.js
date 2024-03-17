import webUserRouter from "../routes/webUserRouter.js"


let authorized=(roles)=>{
    return async(req,res,next)=>{
  try {
    let  id=req.id
    let result=await webUserRouter.findById(id)
    let tokenRole=result.role
    if(roles.includes(tokenRole)){
  next()
    }else{
  let error =new Error("user not authorized.")
  throw error
    }
  } catch (error) {
    res.status(400).json({
      success:false,
      message:"user not authorized"
    })
  }
    }
  }
  export default authorized