const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Products base's Products structure 
const OrdersSchema = new Schema(
  {
    id: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    subCountry: {
        type: String,
        required: true
    },
    tel: {
        type: String,
        required: true
    },
    fax: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = orders = mongoose.model("Orders", OrdersSchema);