// <import packages
import mongoose, { Schema } from "mongoose";
// import packages>

/**
 * @description create post schema
 */
const postSchema = new Schema({
    createdBy : {
        type : String,
        required : true
    },
    quotationsBy : {
        type : String,
        required : true
    },
    postContent : {
        type : String,
        required : true
    }
}, {timestamps : true});

export default mongoose.model("Post", postSchema);