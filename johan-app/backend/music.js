const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MusicAlbumsSchema = new Schema(
  {
    title: {
        type: String,
        default: ""
    }
  },
  { timestamps: true }
);


module.exports = musicalbums = mongoose.model("MusicAlbums", MusicAlbumsSchema);