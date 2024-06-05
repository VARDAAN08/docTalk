import React, { useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import imgSrc from '../../assets/images/doc_profle.png';
import { useProfile } from '../../context/Profile.context';
import { toast, ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';

export default function ReferDoctor() {
	const { id } = useParams();
	const { profile } = useProfile();
	const [doctor, setDoctor] = useState({});
	const [doctors, setDoctors] = useState([]);

	useEffect(() => {
		async function fetchAppt() {
			const token = localStorage.getItem('doctalk');
			const res = await axios.get('/doctor/getAllDoctors', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (res.status === 200 && res.data.doctors) {
				let docs = res.data.doctors.filter(doc => doc._id !== profile.userId);
				setDoctors(docs);
			}
		}
		fetchAppt();
	}, []);

	async function handleRefer(e) {
		e.preventDefault();
		try {
			const docId = doctor._id;
			const reportId = id;
			console.log("Doctor",doctor)
			const token = localStorage.getItem('doctalk');
			const res = await axios.post('/doctor/referDoctor', {
				docId,
				reportId
			},{
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (res.status === 200) {
				toast.success('Referred successfully', {
					position: 'top-center',
					autoClose: 1000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
			}
		} catch (err) {
			console.log('ujjwal ', err);
			toast.error(err.response.data.message, {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		}
	}

	return (
		<>
			<ToastContainer />
			<div className='container mt-5 mb-5'>
				<div className='d-flex justify-content-between mb-3'>
					{' '}
					<span>Doctors</span>{' '}
				</div>
				<div className='row g-2' id='doctor_table_row'>
					{doctors.length > 0 ? (
						doctors.map((doctor, index) => (
							<div className='col-md-3' key={index}>
								<div className='card p-2 py-3 text-center'>
									<div className='img mb-2'>
										{' '}
										<img
											src={
												doctor.pic !== ''
													? `http://localhost:8000${doctor.pic}`
													: imgSrc
											}
											width='70'
											style={{
												minWidth: '80px',
												minHeight: '80px',
												maxWidth: '80px',
												maxHeight: '80px'
											}}
											className='rounded-circle'
											alt=''
										/>{' '}
									</div>
									<h5 className='mb-0'>{doctor.name}</h5>
									<small>{doctor.doc_speciality}</small>
									<div className='mt-4 apointment'>
										{' '}
										<button
											className='btn btn'
											style={{ backgroundColor: '#C1DEAE' }}
											onClick={e => (handleRefer(e), setDoctor(doctor))}>
											Refer
										</button>{' '}
									</div>
								</div>
							</div>
						))
					) : (
						<div>No doctors available</div>
					)}
				</div>
			</div>
		</>
	);
}
