import mongoose from '../database'

var RoomSchema = new mongoose.Schema(
    {
        name: String,
        users:[
            {
                types: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        messages:[
            {
                types: mongoose.Schema.Types.ObjectId,
                ref: "Message"
            }
        ]
    }
)

module.exports = mongoose.model("Room",RoomSchema)