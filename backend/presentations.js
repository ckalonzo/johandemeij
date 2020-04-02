const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Products base's Products structure 
const PresentationsSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    cdName:{
        type: String,
        required: true
    },
    subTitle: {
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
    totalTime: {
        type: String,
        required: true
    },
    synopsis: {
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
    codes: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    cd: {
        type: String,
        required: true
    },
    otherCd: {
        type: String,
        required: true
    },
    score: {
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
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = presentations = mongoose.model("Presentations", PresentationsSchema);