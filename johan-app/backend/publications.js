const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Products base's Products structure 
const ProductsSchema = new Schema(
  {
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: ''
    },
    subTitle:{
        type: String,
        required: true
    },
    composer: {
        type: String,
        required: true
    },
    instrumentation: {
        type: String,
        required: true
    },
    synopsis: {
        type: String,
        required: true
    },
    CD: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    codes: {
        type: String,
        required: true
    },
    score: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    video: {
        type: String,
        required: true
    },
    embedCode: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = products = mongoose.model("Products", ProductsSchema);