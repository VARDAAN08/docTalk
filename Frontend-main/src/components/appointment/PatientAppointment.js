/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import imgSrc from '../../assets/images/user.png';
import AppointmentModal from '../../components/modal/AppointmentModal';
import { ToastContainer } from 'react-toastify';


export default function PatientAppointment() {
	const [appointments, setAppointments] = useState([]);

	useEffect(() => {
		async function fetchAppt() {
			const token = localStorage.getItem('doctalk');
			// console.log(token);
			const res = await axios.get('/patient/getAllReports', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});
			console.log(res.data.data);
			if (res.status === 200 && res.data.data) {
				let appts = res.data.data;
				// console.log(id, appts);
				setAppointments(appts);
			}
		}

		fetchAppt();
	}, []);

	const [modalAppointment, setModalAppointment] = useState({});
	return (
		<div>
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
										<th scope='col'>Doctor Name</th>
										<th scope='col'>Date</th>
										<th scope='col'>Time</th>
										<th scope='col'>Details</th>
										<th scope='col'>Meeting Link</th>
										<th scope='col'>Referred To</th>
									</tr>
								</thead>
								<tbody>
									{appointments.map((appointment, index) => (
										<tr key={index}>
											<td className='px-6 py-4'>
												<div className='flex items-center space-x-3'>
													<div className='inline-flex w-10 h-10'>
														{' '}
														<img
															className='w-10 h-10 object-cover rounded-full'
															alt='User avatar'
															src={imgSrc}
														/>{' '}
													</div>
													<div>
														<p> {appointment.DoctorId.name} </p>
														<p className='text-gray-500 text-sm font-semibold tracking-wide'>
															{' '}
															{appointment.DoctorId.email}
														</p>
													</div>
												</div>
											</td>
											<td className='px-6 py-4'>
												<p className=''> {appointment.date} </p>
											</td>
											<td className='px-6 py-4'>
												<p className=''> {appointment.time} </p>
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
											<td className='px-6 py-4 text-center'>
												{' '}
												<a
													className='text-current'
													target='_blank'
													href={appointment.meetLink}
													style={{ color: '#219F94' }}>
													Join
												</a>
											</td>
											<td className='px-6 py-4'>
												<p className=''>{appointment.referedDoctor?.name} </p>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
