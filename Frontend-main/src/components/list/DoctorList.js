import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DoctorModal from '../../components/modal/DoctorModal';
import imgSrc from '../../assets/images/doc_profle.png'

export default function DoctorList() {
	const [doctors, setDoctors] = useState([]);
	const [modalDoctor, setModalDoctor] = useState({});

	useEffect(() => {
		async function fetchAppt() {
			const token = localStorage.getItem('doctalk');
			// console.log(data);
			const res = await axios.get('/doctor/getAllDoctors', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			if (res.status === 200 && res.data.doctors) {
				setDoctors(res.data.doctors);
			}
		}
		fetchAppt();
	}, []);

	return (
		<>
			<DoctorModal doctor={modalDoctor} />
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
											src={doctor.pic!== '' ? `http://localhost:8000${doctor.pic}` : imgSrc}
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
											data-bs-toggle='modal'
											data-bs-target='#exampleModal'
											onClick={() => setModalDoctor(doctor)}
											className='btn'
											style={{ backgroundColor: '#C1DEAE' }}>
											View Details
										</button>{' '}
									</div>
									<div className='mt-4 apointment'>
										{' '}
										<Link to={`/patient/bookappointment/${doctor._id}`}>
											<button
												className='btn btn'
												style={{ backgroundColor: '#C1DEAE' }}>
												Book Appointment
											</button>{' '}
										</Link>
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
