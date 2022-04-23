const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WalletSchema = new Schema({
    buyerId: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

module.exports = Wallet = mongoose.model("Wallet", WalletSchema);