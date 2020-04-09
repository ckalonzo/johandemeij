const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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


module.exports = posts = mongoose.model("Posts", PostsSchema);