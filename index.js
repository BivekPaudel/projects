import express from "express"
import cors from "cors"
import json from "express"
import connectToMongoDB from "./src/Database/connectdb.js"
import { port } from "./constant.js"
import webUserRouter from "./src/routes/webUserRouter.js"
import userRouter from "./src/routes/userRouter.js"
let expressApp=express()

expressApp.use(express.static("./public"))
expressApp.use(cors())
expressApp.use(json())

expressApp.use("web-users",webUserRouter)
expressApp.use("users",userRouter)
expressApp.listen(port, () => {
    console.log(`app is listening at port ${port}`);
  });
  connectToMongoDB()