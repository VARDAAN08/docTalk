const Patient = require('../models/user');
const Doctor = require('../models/doctor');
const Report = require('../models/report');

const reportUpload = async (req, res) => {
	try {
		const { date, time, DoctorId, reasonForVisit } = req.body;
		console.log(req.body);
		const doctor = await Doctor.findById(DoctorId);
		console.log(req.files);
		if (!doctor) {
			throw new Error('Doctor Doesnt Exist');
		} else {
			if (req.files && req.files.length > 5) {
				throw new Error('Maximum 5 files are allowed');
			}
			let report = new Report({
				date,
				time,
				DoctorId,
				reasonForVisit,
				patientId: req.user.id
				// medicalFiles: `/images/${req.files[0].filename.replace(/ /g, "_")}`,
			});

			if (req.files) {
				for (let i = 0; i < req.files.length; i++) {
					report.medicalFiles.push(
						`/images/${req.files[i].filename.replace(/ /g, '_')}`
					);
				}
			}

			console.log(report);
			await report.save();
			res.status(200).json({
				status: 'success',
				message: 'Successfully uploaded Report'
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			status: 'Failure',
			message: error
		});
	}
};

const getAllReports = async (req, res) => {
	try {
		const reports = await Report.find({ patientId: req.user.id })
			.populate('DoctorId')
			.populate('referedDoctor');
		if (reports) {
			res.status(200).json({
				status: 'success',
				data: reports
			});
		} else {
			res.status(404).json({
				status: 'error',
				message: 'No Reports Found'
			});
		}
	} catch (error) {
		res.status(500).json({
			status: 'Failure',
			message: error
		});
	}
};

const getPatientById = async (req, res, next) => {
	try {
		const patient = await Patient.findById(req.params.id);
		if (patient) {
			return {
				status: 'success',
				user: patient,
				isPatient: true
			};
		} else {
			return {
				status: 'error',
				message: 'No Patient Found'
			};
		}
	} catch (error) {
		return {
			status: 'Failure',
			message: error
		};
	}
};

module.exports = {
	reportUpload,
	getAllReports,
	getPatientById
};
