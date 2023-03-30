const router = require("express").Router();
require('dotenv').config()
// const stripe = require("stripe")(process.env.SECRET_STRIPE); //it work 2
// mistake in name
const KEY = process.env.SECRET_STRIPE; //it work
const stripe = require("stripe")(KEY); //it work



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