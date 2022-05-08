const mongoose = require("mongoose")

const FavouriteSchema = new mongoose.Schema(
    {
   userId: { type: String, required:true, unique:true},
   products: [
       {
           productId:{
               type:String,
           },
           title: { type: String, required:true},
           img: { type: String, required:true},
           price: { type: Number, required:true},
       },
   ],
},
{timestamps: true }
);

module.exports = mongoose.model("Favourite",FavouriteSchema)