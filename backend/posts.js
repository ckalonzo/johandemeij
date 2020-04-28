const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostsSchema = new Schema(
  {
    ID: {
        type: String,
        default:''
    },
    postContent:{
        type: String,
        default:''
    },
    postTitle: {
        type: String,
        default:''
    },
    postDate: {
        type: String,
        default:''
    },
    postParent: {
        type: String,
        default:''
    },
    showPost: {
        type: String,
        default:''
    },
    postImage: {
        type: Array,
        default:[]
    }
  },
  { timestamps: true }
);


module.exports = posts = mongoose.model("Posts", PostsSchema);