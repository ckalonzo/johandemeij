const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostImagesSchema = new Schema(
  {
    id: {
        type: String,
        default:''
    },
    albumID:{
        type: String,
        default:''
    },
    imageName: {
        type: String,
        default:''
    },
    dateCreated: {
        type: String,
        default:''
    },
    caption: {
        type: String,
        default:''
    },
    cover: {
        type: String,
        default:''
    }
  },
  { timestamps: true }
);


module.exports = postimages = mongoose.model("PostImages", PostImagesSchema);