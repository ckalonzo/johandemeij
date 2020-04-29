const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = musiccatalogue = mongoose.model("Musiccatalogue", MusiccatalogueSchema);