const { remove } = require("../models/Favourite");
const Favourite = require("../models/Favourite");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken");

const router = require("express").Router();


//CREATE
router.post("/", verifyToken, async (req,res)=>{
    const newFavourite = new Favourite(req.body);

    try{
      const savedFavourite = await newFavourite.save();
      res.status(200).json(savedFavourite)
      return
    }catch(err){
        res.status(500).json(err)
        return
    }
});

 //UPDATE ADD
router.put("/:userId", verifyToken, async (req,res)=>{
    try{
     const updatedFavourite = await Favourite.findOneAndUpdate(
         {userId: req.params.userId},
         {$push: {products: req.body.products}
        },
     { new: true }
     );
     res.status(200).json(updatedFavourite);
     return
    }catch(err){
        res.status(500).json(err);
        return
    }
});

 //UPDATE DELETE
 router.put("/remove/:userId", verifyToken, async (req,res)=>{
    try{
     const updatedFavouriteDel = await Favourite.findOneAndUpdate(
          
        {userId: req.params.userId},
         {
        $pull: {products: req.body.products}
    },

     );
     res.status(200).json(updatedFavouriteDel);
     return
    }catch(err){
        res.status(500).json(err);
        return
    }
});

//GET USER FAVOURITES
router.get("/find/:userId", verifyToken, async (req, res) => {
    try {
        const favourites = await Favourite.findOne({ userId: req.params.userId })
        res.status(200).json(favourites);
        return
    } catch (err) {
        res.status(500).json(err)
        return
    }
})

//GET PRODUCT
router.get("/find/:userId/:productId", async (req,res)=>{
    try{
     const product = await Favourite.findOne({ userId: req.params.userId, products: {$elemMatch:{productId: req.params.productId}}}) //wyszukiwanie po elemencie obiektu z tablicy
     res.status(200).json(product);
     return
    }catch(err){
        res.status(500).json(err)
        return
    }
})

module.exports = router