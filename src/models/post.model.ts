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
    quoter : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Quoter"
    },
    postContent : {
        type : String,
        required : true
    },
    creatorId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps : true});

export default mongoose.model("Post", postSchema);