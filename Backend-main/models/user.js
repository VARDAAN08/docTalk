const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
	name: {
		type: String,
		required: [true, 'A patient must have a first name']
	},
	email: {
		type: String,
		required: [true, 'A patient must have an email'],
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	phn: {
		type: Number,
		required: [true, 'A patient must have a phone number']
	},
	age: {
		type: Number,
		required: [true, 'A patient must enter age']
	},
	gender: {
		type: String,
		required: [true, 'A patient must enter their gender']
	},
	role: {
		type: String,
		default: 'Patient'
	},
	documents: [
		{
		  type: mongoose.Schema.Types.ObjectId,
		  ref: "Document",
		},
	  ],
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
