const mongoose = require('mongoose');
const { Schema } = mongoose;

const dogSchema = new Schema({
	breed: String,
	name: String,
	gender: String,
	size: Number,
	weight: Number,
	age: Number,
	fixed: Boolean,
	hairType: String,
	catFriendly: Boolean,
	dogFriendly: Boolean,
	kidFriendly: Boolean,
	photoSrc: String,
	leashTrained: Boolean,
	houseTrained: Boolean,
	vaccines: Array,
	birthday: Date
});

mongoose.model('dogs', dogSchema);