const mongoose = require("mongoose");

//create a Schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],  //array of all strings
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

//create a model
const PostModel = mongoose.model("PostModel", postSchema);

module.exports = PostModel;