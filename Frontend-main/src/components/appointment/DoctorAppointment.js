/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AppointmentModal from '../../components/modal/AppointmentModal';
import imgSrc from '../../assets/images/user.png';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function DoctorAppointment() {
	const [appointments, setAppointments] = useState([]);

	const [modalAppointment, setModalAppointment] = useState({});

	useEffect(() => {
		async function fetchAppt() {
			const token = localStorage.getItem('doctalk');
			// console.log(token);
			const res = await axios.get('/doctor/getAppointments', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			// console.log(res.data.appointments);
			if (res.status === 200 && res.data.appointments) {
				setAppointments(res.data.appointments);
			}
		}
		fetchAppt();
	}, []);
	console.log('ujjwal', appointments);
	return (
		<>
      <ToastContainer />
			{modalAppointment !== {} && (
				<AppointmentModal appointment={modalAppointment} />
			)}
			<div className='p-10 bg-surface-secondary'>
				<div className='container'>
					<div className='card'>
						<div className='card-header'>
							<h6>Appointments</h6>
						</div>
						<div className='table-responsive'>
							<table className='table table-hover table-nowrap'>
								<thead className='table-light'>
									<tr>
										<th scope='col'>Name</th>
										<th scope='col'>Age</th>
										<th scope='col'>Time</th>
										<th scope='col'>Email</th>
										<th scope='col'>Phone</th>
										<th scope='col'>Details</th>
										<th scope='col'>Meeting Link</th>
										<th scope='col'>Refer</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{appointments?.length > 0 ? (
										appointments?.map((appointment, index) => (
											<tr key={index}>
												<td data-label='Job Title'>
													{' '}
													<img
														alt='...'
														src={imgSrc}
														className='avatar avatar-sm rounded-circle me-2'
													/>{' '}
													<a className='text-heading font-semibold' href='#'>
														{' '}
														{appointment.patientId.name}{' '}
													</a>{' '}
												</td>
												<td data-label='Email'>
													{' '}
													<span>{appointment.patientId.age}</span>{' '}
												</td>
												<td data-label='Email'>
													{' '}
													<span>{appointment.time}</span>{' '}
												</td>
												<td data-label='Phone'>
													{' '}
													<a className='text-current' href='#'>
														{appointment.patientId.email}
													</a>{' '}
												</td>
												<td data-label='Lead Score'>
													{' '}
													<a
														className='text-current'
														href={{ tel: appointment.patientId.phn }}>
														{appointment.patientId.phn}
													</a>{' '}
												</td>
												<td data-label=''>
													{' '}
													<button
														data-bs-toggle='modal'
														data-bs-target='#AppointmentModal'
														className='btn btn'
														style={{
															fontSize: '12px',
															padding: '5px !important',
															backgroundColor: 'transparent !important',
															color: '#219F94'
														}}
														onClick={() => setModalAppointment(appointment)}>
														View
													</button>{' '}
												</td>
												<td data-label=''>
													{' '}
													<a
														className='text-current'
														target='_blank'
														href={`http://localhost:8000/live/${appointment._id}`}
														style={{ color: '#219F94 !important' }}>
														Join
													</a>{' '}
												</td>
												<td data-label=''>
													{' '}
													<Link
														className='text-current'
														to={`/doctor/referdoctors/${appointment._id}`}>
														<button
															className='btn btn'
															style={{
																fontSize: '10px;padding:5px !important',
																backgroundColor: '#C1DEAE !important'
															}}>
															Refer
														</button>
													</Link>{' '}
												</td>
											</tr>
										))
									) : (
										<div className='p-5'>No appointments</div>
									)}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
