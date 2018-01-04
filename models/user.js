var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	email: {
		type: String
	},
	password: {
		type: String,
		required: true
	},
	contact_no: {
		type: String
	},
	created_at: {
		type: Date,
	},
	updated_at: {
		type: Date
	}

});

var User = mongoose.model('User', userSchema);

module.exports = User;