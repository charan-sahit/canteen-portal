const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Food Item Schema
const FavoriteSchema = new Schema({
    buyerId: {
        type: String,
        required: true
    },
    foodItemId: {
        type: String,
        required: true
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
    }
});

module.exports = Favorite = mongoose.model("Favorites", FavoriteSchema);