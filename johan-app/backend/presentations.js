const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Products base's Products structure 
const PresentationsSchema = new Schema(
  {
    id: {
        type: String,
        default:''
    },
    cdName:{
        type: String,
        default:''
    },
    subTitle: {
        type: String,
        default:''
    },
    composer: {
        type: String,
        default:''
    },
    instrumentation: {
        type: String,
        default:''
    },
    totalTime: {
        type: String,
        default:''
    },
    synopsis: {
        type: String,
        default:''
    },
    frontCover: {
        type: String,
        default:''
    },
    backCover: {
        type: String,
        default:''
    },
    dateCreated: {
        type: String,
        default:''
    },
    frontCaption: {
        type: String,
        default:''
    },
    backCaption: {
        type: String,
        default:''
    },
    category: {
        type: String,
        default:''
    },
    codes: {
        type: String,
        default:''
    },
    duration: {
        type: String,
        default:''
    },
    grade: {
        type: String,
        default:''
    },
    cd: {
        type: String,
        default:''
    },
    otherCd: {
        type: String,
        default:''
    },
    score: {
        type: String,
        default:''
    },
    audio: {
        type: String,
        default:''
    },
    video: {
        type: String,
        default:''
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = presentations = mongoose.model("Presentations", PresentationsSchema);