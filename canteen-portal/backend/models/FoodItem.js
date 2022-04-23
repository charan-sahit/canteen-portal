const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Food Item Schema
const FoodItemSchema = new Schema({
    name:   {
        type: String,
        required: true
    },
    vendorId: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: false
    },
    veg: {
        type: Boolean,
        required: true
    },
    addOn: {
        type: [Map],
        required: false
    },
    tags: {
        type: [String],
        required: false
    },
    shopName: {
        type: String,
        required: true
    },
    numberOfOrders: {
        type: Number,
        required: false,
        default: 0
    }
});

module.exports = FoodItem = mongoose.model("FoodItem", FoodItemSchema);