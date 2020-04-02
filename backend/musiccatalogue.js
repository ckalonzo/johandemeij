const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Products base's Products structure 
const MusiccatalogueSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    catalogueNumber:{
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    instrumentation: {
        type: String,
        required: true
    },
    composerArranger: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    priceInEuros: {
        type: String,
        required: true
    },
    priceInDollars: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = musiccatalogue = mongoose.model("Musiccatalogue", MusiccatalogueSchema);