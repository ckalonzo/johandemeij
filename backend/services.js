const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Services base's Services structure 
const ServicesSchema = new Schema(
  {
    name:{
      type:String,
      default:""
    },
    serviceLocation: {
        address1:{
            type:String,
            default:""
        },
        city:{
            type:String,
            default:""
        },
        state:{
            type:String,
            default:""
        },
        postcode:{
            type:String,
            default:""
        },
        coordinates:{
            _id:false,
            latitude:{
                type:String,
                default:""
        },
        longitude:{
            type:String,
            default:""
        }
      }
    },
    description:{
        type:String,
        default:""
      },
    category:{
        type:String,
        default:""
    },
    contactPreferences:{
        showNumber:Boolean,
        allowPhoneCalls:Boolean,
        allowTexts:Boolean,
        showEmail:Boolean
    }
  },
  { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = services = mongoose.model("Services", ServicesSchema);