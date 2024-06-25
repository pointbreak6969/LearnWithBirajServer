import mongoose, {Schema} from "mongoose";

const querySchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
}, 
 {
    timestamps: true
 });

const Query = mongoose.model("query", querySchema);
export {Query};