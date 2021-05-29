import mongoose from 'mongoose';

var User = new mongoose.Schema({
    githubId:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})