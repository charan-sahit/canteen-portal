const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Food Item Schema
const OrderSchema = new Schema({
    buyerId: {
        type: String,
        required: true
    },
    quantity : {
        type: Number,
        required: true,
        default: 1
    },
    status:{
        type: String,
        required: true,
        enum: ["PLACED", "ACCEPTED", "COOKING", "READY FOR PICKUP", "COMPLETED", "REJECTED"],
        default: "PLACED"
    },
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
    foodItemId: {
        type: String,
        required: true
    }
});

module.exports = Order = mongoose.model("Orders", OrderSchema);