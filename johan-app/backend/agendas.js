const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AgendaSchema = new Schema(
  {
    id: {
        type: String,
        default:""
    },
    orchestra:{
        type: String,
        default:""
    },
    cd: {
        type: String,
        default:""
    },
    cd1: {
        type: String,
        default:""
    },
    cd2: {
        type: String,
        default:""
    },
    cd3: {
        type: String,
        default:""
    },
    date: {
        type: String,
        default:""
    },
    time: {
        type: String,
        default:""
    },
    location: {
        type: String,
        default:""
    },
    city: {
        type: String,
        default:""
    },
    country: {
        type: String,
        default:""
    },
    synopsis: {
        type: String,
        default:""
    },
    day: {
        type: String,
        default:""
    },
    month: {
        type: String,
        default:""
    },
    year: {
        type: String,
        default:""
    },
    title: {
        type: String,
        default:""
    },
    ON_OFF: {
        type: String,
        default:""
    }
  },
  { timestamps: true }
);


module.exports = agendas = mongoose.model("Agendas", AgendaSchema);