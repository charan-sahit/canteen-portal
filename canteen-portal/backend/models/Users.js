const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BuyerSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: 'This email is already registered',
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email']
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true,
		validate: {
			validator: function(v) {
			  return /\d{10}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		  },
		required: 'Enter a 10-digit contact number'
	
	},
	age: {
		type: String,
		required: true
	},
	batch: {
		type: String,
		required: true
	},
	
	date:{
		type: Date,
		required: false
	},
});

module.exports = Buyer = mongoose.model("Users", BuyerSchema);
