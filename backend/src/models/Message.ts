import mongoose from "mongoose"

var MessageSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        name: String
    },
    text: String,
    time: {
        type : Date, 
        default: Date.now
    }
})

module.exports = mongoose.model("Message",MessageSchema)