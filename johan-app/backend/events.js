const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventsSchema = new Schema(
  {
    id: {
        type: String,
        default:''
    },
    title:{
        type: String,
        default:''
    },
    synopsis: {
        type: String,
        default:''
    }
  },
  { timestamps: true }
);


module.exports = events = mongoose.model("Events", EventsSchema);