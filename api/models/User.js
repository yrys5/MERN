const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
   username: { type: String, required:true, unique:true, minLength:3, maxlength:16},
   email: { type: String, required:true, unique:true},
   emailToken: {type: String, required:true},
   password: { type: String, required:true},
   img:{type:String},
   isAdmin: {
       type: Boolean,
       default: false,
   },
   isVerified: {type: Boolean, default: false },
},
{timestamps: true }
);

module.exports = mongoose.model("User", UserSchema)