const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our Users base's Users structure 
const UsersSchema = new Schema(
    {
        name: {
            _id:false,
            first:{
                type:String,
                default:""
            },
            last:{
              type:String,
              default:""
            }
        },
        username: {
            type: String,
            default:""
        },
        password: {
            type: String,
            required: true
        }
      },
      { timestamps: true }
);

// export the new Schema so we could modify it using Node.js
module.exports = users = mongoose.model("Users", UsersSchema);