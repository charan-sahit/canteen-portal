const mongoose = require('mongoose');
const schema = mongoose.Schema;

//create schema
const VendorSchema = new schema({
    mname: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true,
        unique: 'This email is already registered',
        match: [/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/, 'Invalid email']
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
    openingTime: {
        type: String,
        required: true
    },
    closingTime: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    placedOrders: {
        type: Number,
        required: true,
        default: 0
    },
    pendingOrders: {
        type: Number,

        required: true,
        default: 0
    },
    completedOrders: {
        type: Number,
        required: true,
        default: 0
    }

});

module.exports = Vendor = mongoose.model('Vendors', VendorSchema);
