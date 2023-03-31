// <import packages
import mongoose, { Schema } from "mongoose";
// import packages>

/**
 * @description create user schema
 */
const userSchema = new Schema({
    email : {
        type : String,
        required : true,
        unique: true
    },
    password : {
        type : String,
        required : true
    },
    userName : {
        type : String,
        required : true
    }
}, {timestamps : true});

export default mongoose.model("User", userSchema);