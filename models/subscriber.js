
// import 
const mongoose = require('mongoose')

// create db schema
const subscriberSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	channel: {
		type: String,
		required: true
	},
	subDate: {
		type: Date,
		default: Date.now(),
		required: true
	}
})

// export Subscriber model
// Subscriber is name of the collection
module.exports = mongoose.model('Subscriber', subscriberSchema)