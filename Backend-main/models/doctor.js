const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
	{
		name: {
			type: String,
			required: [true, 'A doctor must have a name']
		},
		email: {
			type: String,
			required: [true, 'A doctor must have an email'],
			unique: true
		},
		password: {
			type: String,
			required: true
		},
		phn: {
			type: Number,
			required: [true, 'A doctor must have a phone number']
		},
		age: {
			type: Number,
			required: [true, 'A doctor must enter age']
		},
		gender: {
			type: String,
			required: [true, 'A doctor must enter their gender']
		},
		role: {
			type: String,
			default: 'Doctor'
		},
		pic: String,
		documents: String,
		description: String,
		validation: {
			type: Boolean,
			default: false
		},
		speciality: String,
		clinicName: String,
		clinicAddress: String,
		clinicMap: String
	},
	{
		timestamps: true
	}
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
