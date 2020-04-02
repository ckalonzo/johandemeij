const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Products base's Products structure 
const cdinfoSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    cdName:{
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    totalTime: {
        type: String,
        required: true
    },
    frontCover: {
        type: String,
        required: true
    },
    backCover: {
        type: String,
        required: true
    },
    dateCreated: {
        type: String,
        required: true
    },
    frontCaption: {
        type: String,
        required: true
    },
    backCaption: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    addInfo: {
        type: String,
        required: true
    },
    cdImage: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = cdinfo = mongoose.model("Cdinfo", cdinfoSchema);