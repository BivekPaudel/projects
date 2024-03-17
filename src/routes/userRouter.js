import { Router } from "express"
import { createUser, deleteUser, readAllUser, readById, updateUser } from "../controller/userController.js"


let userRouter=Router()

userRouter
.route("/")
.post(createUser)
.get(readAllUser)
userRouter
.route("/:id")
.get(readById)
.patch(updateUser)
.delete(deleteUser)        
    
  

export default userRouter