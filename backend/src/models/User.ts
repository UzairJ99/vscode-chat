import mongoose from '../database'

var userSchema = new mongoose.Schema({
    githubId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatarUrl:{
        type: String,
        required: true
    },
    profileUrl: {
        type: String,
        required: false
    },
    accessToken: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model("User",userSchema);
