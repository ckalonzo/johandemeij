const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Products base's Products structure 
const PostsSchema = new Schema(
  {
    ID: {
        type: String,
        required: true
    },
    postContent:{
        type: String,
        required: true
    },
    postTitle: {
        type: String,
        required: true
    },
    postDate: {
        type: String,
        required: true
    },
    postParent: {
        type: String,
        required: true
    },
    showPost: {
        type: Boolean
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = posts = mongoose.model("Posts", PostsSchema);