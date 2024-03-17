import { Schema } from "mongoose";

let webUserSchema = Schema(
    {
      userName: {
        required: [true, "userName filed is required."],
        type: String,
        trim: true,
      },
      email: {
        unique: true,
        required: [true, "email filed is required."],
        type: String,
        trim: true,
      },
      password: {
        required: [true, "password filed is required."],
        type:String,
        trim: true,
      },
      role: {
        required: [true, "role filed is required."],
        type: String,
        trim: true,
      },
      isVerifiedEmail: {
       
        type: Boolean,
        trim: true,
      },
    },
    { timestamps: true }
  );
  export default webUserSchema;
  