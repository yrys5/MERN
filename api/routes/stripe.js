const router = require("express").Router();
require('dotenv').config()
// const stripe = require("stripe")(process.env.SECRET_STRIPE); //it work 2
const KEY = process.env.SECRET_STRIPE; //not work2
const stripe = require("stripe")(KEY); //not work2



router.post("/payment", (req, res) => {
   stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(501).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;