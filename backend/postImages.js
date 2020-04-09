const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PostImagesSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    albumID:{
        type: String,
        required: true
    },
    imageName: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);


module.exports = postImages = mongoose.model("PostImages", PostImagesSchema);