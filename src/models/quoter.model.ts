// <import packages
import mongoose, { Schema } from "mongoose";
// import packages>

/**
 * @description create quoter schema
 */
const quoterSchema = new Schema({
    quoter : {
        type : String,
        required : true
    },
    creator : {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
}, {timestamps : true});

export default mongoose.model("Quoter", quoterSchema);