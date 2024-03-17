import { model } from "mongoose";
import userSchema from "./userSchema.js";
import webUserSchema from "./webUserSchema.js";

export let WebUser=model("WebUser",webUserSchema)
export let User=model("User",userSchema)