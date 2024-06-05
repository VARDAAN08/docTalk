const Doctor = require('../models/doctor');
const Report = require('../models/report');

const getAllDoctors = async (req, res) => {
	try {
		console.log("hit");
		const doctors = await Doctor.find();               // validation check hta diya mene
		res.status(200).json({
			status: 'success',
			doctors
		});
	} catch (error) {
		res.status(500).json({
			status: 'Failure',
			message: error.message
		});
	}
};

const getAppointments = async (req, res) => {
	try {
		console.log(req.user.id)
		const appointments = await Report.find({ DoctorId: req.user.id })
			.populate('patientId')
			.populate('DoctorId')
			.populate('referedDoctor');
		if (appointments) {
			res.status(200).json({
				status: 'success',
				appointments
			});
		} else {
			res.status(404).json({
				status: 'error',
				message: 'No Appointments Found'
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 'Failure',
			message: error.message
		});
	}
};

const referDoctor = async (req, res) => {
	try {
		console.log("DocID",req.body.docId);
		const refered = await Doctor.findById(req.body.docId);
		const report = await Report.findById(req.body.reportId);
		report.referedDoctor = refered._id;
		await report.save();
		if (report) {
			res.status(200).json({
				status: 'success',
				data: report
			});
		} else {
			res.status(404).json({
				status: 'error',
				message: 'No Doctor Found'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'Failure',
			message: error.message
		});
	}
};

const getReferedAppointments = async (req, res) => {
	try {
		console.log(req.user);
		const appointments = await Report.find({
			referedDoctor: req.user._id
		}).populate('patientId');
		console.log(appointments);
		if (appointments) {
			return res.status(200).json({
				status: 'success',
				appointments
			});
		} else {
			return res.status(404).json({
				status: 'error',
				message: 'No Appointments Found'
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 'Failure',
			message: error.message
		});
	}
};

const uploadPrescription = async (req, res) => {
	try {
		const report = await Report.findById(req.body.reportId);
		console.log(req.body.reportId);
		if (!report) {
			return res.status(404).json({
				status: 'error',
				message: 'Report not found'
			});
		}
		for (let i = 0; i < req.files.length; i++) {
			report.prescription.push(
				`/images/${req.files[i].filename.replace(/ /g, '_')}`
			);
		}
		await report.save();
		res.status(200).json({
			status: 'success',
			message: 'Prescription Uploaded'
		});
	} catch (error) {
		res.status(500).json({
			status: 'Failure',
			message: error.message
		});
	}
};

const getDoctorById = async (req, res) => {
	const id = req.params.id;
	const doctor = await Doctor.findById(id);
	if (!doctor) {
		return {
			message: 'Doctor not found'
		};
	}
	return {
		status: 'success',
		user: doctor,
		isPatient: false
	};
};

module.exports = {
	getAllDoctors,
	getAppointments,
	getReferedAppointments,
	referDoctor,
	uploadPrescription,
	getDoctorById
};
