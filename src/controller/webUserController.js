import bcrypt from "bcrypt"
import jwt from "json-web-token";
import { secretKey } from "../../constant.js";
import webUserSchema from "../schema/webUserSchema.js";
import { sendEmail } from "../utils/sendMail.js";
import { createWebUserService } from "../service/webuser.js";
export let createWebUserController = async (req, res, next) => {
    try {
      let data = req.body;
      let hashPassword = await bcrypt.hash(data.password, 10);
      data = {
        ...data,
        isVerifiedEmail: false,
        password: hashPassword,
      };
  
      let result = await createWebUserService(data);
      // console.log(result)
      let infoObj = {
        id: result.id,
      };
      let expiryInfo = {
        expiresIn: "5d",
      };
      let token = await jwt.sign(infoObj, secretKey, expiryInfo);
  
      await sendEmail({
        from: "'ECOMMERCE'<vivekpoudel799@gmail.com>",
        to: [data.email],
        subject: "account create",
        html: `<h1>your account has been created successfully.</h1>
  <a href="${clientUrl}/verify-email?token=${token}">"${clientUrl}/verify-email?token=${token}"</a>
  `,
      });
      res.status(201).json({
        success: true,
        message: "webUser create successfully",
        data: result,
        token:token
      });
      
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
      
    }
   
  };
  export let verifyEmail = async (req, res, next) => {
    try {
      let tokenString = req.headers.authorization;
      let token = tokenString.split(" ")[1];
      //verify token
      let infoObj = await jwt.verify(token, secretKey);
      let userId = infoObj.id;
  
      let result = await webUserSchema.findByIdAndUpdate(
        userId,
        { isVerifiedEmail: true },
        { new: true }
      );
      // console.log(result)
  
      res.status(200).json({
        success: true,
        massage: "WebUsers verify  successfully",
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export let loginWebUserController = async (req, res, next) => {
    try {
      let email = req.body.email;
      let password = req.body.password;
      let user = await webUserSchema.findOne({ email: email});
      if (user) {
        if (user.isVerifiedEmail) {
          let isValidPassword = await bcrypt.compare(password, user.password);
          if (isValidPassword) {
            let infoObj = {
              id: user._id,
            };
            let expiryInfo = {
              expiresIn: "365d", 
            };
            let token=await jwt.sign(infoObj,secretKey,expiryInfo)
            // console.log(token)
         res.status(201).json({
          success:true,
          message:"webUser create successfully.",
          data:user,
          token:token
         })
          } else {
            let error = new Error("credential does not match");
            throw error;
          }
        } else {
          let error = new Error("credential does not match.");
          throw error;
        }
      } else {
        let error = new Error("credential not found.");
        throw error;
      }
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  };
  export let myProfileWebUserController=async(req,res,nest)=>{
  try {
    let id=req.id
  let result=await webUserSchema.findById(id)
    res.json({
      
      success:true,
      message:"my-profile read successfully.",
      data:result
    })
  } catch (error) {
    res.json({
      success:false,
      message:"unable to read profile."
    })
  }
  }
  export let updateProfileController=async(req,res,next)=>{
  try {
    let id=req.id
    let data=req.body
    delete data.email
    delete data.password
    let result=await webUserSchema.findByIdAndUpdate(id,data,{new:true})
  res.status(201).json({
  success:true,
  message:"profile update successfully.",
  data:result
  })
  } catch (error) {
    res.status(400).json({
  success:false,
  message:error.message
    })
  }
  }
  
  export let updatePasswordController=async(req,res,next)=>{
    try {
      let id=req.id
      let oldPassword=req.body.oldPassword
      let newPassword=req.body.newPassword
    let data=await webUserSchema.findById(id)
    let hashPassword=data.password
   let isValidPassword=await bcrypt.compare(oldPassword, hashPassword) 
   if(isValidPassword){
  let newHashPassword=await bcrypt.hash(newPassword,10)
  let result=await webUserSchema.findByIdAndUpdate(id,{password:newHashPassword},{new:true})
  res.status(201).json({
    success:true,
    message:"password update successfully.",
    data:result
  })
   }else{
    let error=new Error("credential does not match.")
    throw error
   }
     
    } catch (error) {
      res.status(400).json({
        success:false,
        message:error.message
      })
    }
  }
  export let readAllWebUserController=async(req,res,next)=>{
    try {
      let result=await webUserSchema.find({})
      res.status(200).json({
        success:true,
        message:"web user read successfully",
      data:result
      })
    } catch (error) {
      res.status(400).json({
        success:false,
        message:error.message
      })
    }
    }
  
  export let readSpecificWebUserController=async(req,res,next)=>{
  try {
    let id=req.params.id
    let result=await webUserSchema.findById(id)
    res.status(200).json({
      success:true,
      message:"web user read successfully",
    data:result
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    })
  }
  }
  export let updateWebUserController=async(req,res,next)=>{
  try {
    let id=req.params.id
    let data=req.body
    delete data.email
    delete data.password
    let result=await webUserSchema.findByIdAndUpdate(id,data,{new:true})
    res.status(201).json({
      success:true,
      message:"web user update successfully",
    data:result
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    })
  }
  }
  export let deleteWebUserController=async(req,res,next)=>{
  try {
    let id=req.params.id
    let result=await webUserSchema.findByIdAndDelete(id)
    res.status(200).json({
      success:true,
      message:"web user delete successfully",
    data:result
    })
  } catch (error) {
    res.status(400).json({
      success:false,
      message:error.message
    })
  }
  }
  export let forgetPassword=async(req,res,next)=>{
    try {
      let email=req.body.email
      let result=await webUserSchema.findOne({email:email})
      if(result)
      {
        let infoObj = {
          id: result.id,
        };
        let expiryInfo = {
          expiresIn: "5d"
        }
        let token=await jwt.sign(infoObj,secretKey,expiryInfo)
        await sendEmail({
          from: "'Ecommerce'<ecommerce@gmail.com>",
          to: email,
          subject: "Reset Password",
          html: `<h1>Please click given link to reset your password.</h1>
    <a href="${clientUrl}/reset-password?token=${token}">
    "${clientUrl}/reset-password?token=${token}"
    </a>
    `,
        });
        res.status(200).json({
          success:true,
          message:"to reset password link has been sent to the email.",
        })
      }else{
        let error=new Error("email does not exits.")
        throw error
      }
      res.status(200).json({
        success:true,
        message:"web user forget-password successfully",
      data:result,
      token:token
      })
    } catch (error) {
      res.status(400).json({
        success:false,
        message:error.message
      })
    }
  }
  export let resetPassword=async(req,res,next)=>{
    try {
      let hashPassword=await  bcrypt.hash(req.body.password,10)
      let result=await webUserSchema.findByIdAndUpdate(req.id,{password:hashPassword},{new:true})
    res.status(201).json({
      success:true,
      message:"password reset successfully.",
      data:result
    })
    } catch (error) {
      res.status(400).json({
        success:false,
        message:error.message
      })
    }
    }
  