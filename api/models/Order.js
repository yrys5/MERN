const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true },
        products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        amount: { type: Number, required: true },
        address:  [
            {
                country: {
                    type: String
                },
                city: {
                    type: String,
                },
                line1: {
                    type: String
                },
                postalCode: {
                    type: String
                },
            },
        ],
        status: { type: String, default:"pending"},
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema)