/* eslint-disable react/jsx-no-target-blank */
import React, { useState } from 'react';
import './modal.css';
import { toast, ToastContainer } from 'react-toastify';
import { useProfile } from '../../context/Profile.context';
import axios from 'axios';

export default function AppointmentModal({ appointment }) {
	// console.log(appointment);
	const { profile } = useProfile();

	const [files, setFiles] = useState([]);

	const handleUpload = async e => {
		e.preventDefault();
		const fd = new FormData();
		for (let i = 0; i < files.length; i++) {
			fd.append('files', files[i]);
		}

		fd.append('reportId', appointment._id);

		try {
      const res = await axios.post('/doctor/uploadPrescription', fd);
		if (res.status === 200) {
			toast.success('Uploaded ssuccessfully', {
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
		}
    } catch (err) {
      console.log("ujjwal ",err);
			toast.error("There was a problem", {
				position: 'top-center',
				autoClose: 1000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined
			});
    }
    
	};

	return appointment !== null ? (
		<>
			<ToastContainer />
			<div
				className='modal fade'
				id='AppointmentModal'
				tabIndex='-1'
				aria-labelledby='AppointmentModalLabel'
				aria-hidden='true'>
				<div className='modal-dialog modal-xl modal-fullscreen-lg-down'>
					<div className='modal-content'>
						<div className='modal-header'>
							<h5 className='modal-title' id='AppointmentModalLabel'>
								Doctors Details
							</h5>{' '}
							<button
								type='button'
								className='close btn-close'
								data-bs-dismiss='modal'
								aria-label='Close'>
								{' '}
								<span aria-hidden='true'>
									<i className='fa fa-close'></i>
								</span>{' '}
							</button>
						</div>
						<div className='modal-body'>
							<div className='row g-0' id='main_modal_part'>
								<div className='col-md-12'>
									<div className='status p-3'>
										<table
											className='table table-borderless'
											style={{ tableLayout: 'fixed' }}>
											<tbody>
												<tr>
													<td id='td_info_appointment_id'>
														<div className='d-flex flex-column'>
															{' '}
															<span className='heading d-block'>
																Appointment ID
															</span>{' '}
															<span
																className='subheadings'
																id='info_appointment_id'>
																{appointment?._id}
															</span>{' '}
														</div>
													</td>
													<td>
														<div className='d-flex flex-column'>
															{' '}
															<span className='heading d-block'>Date</span>{' '}
															<span
																className='subheadings'
																id='info_appointment_date'>
																{appointment?.date}
															</span>{' '}
														</div>
													</td>
													<td>
														<div className='d-flex flex-column'>
															{' '}
															<span className='heading d-block'>Time</span>{' '}
															<span
																className='subheadings'
																id='info_appointment_time'>
																{appointment?.time}
															</span>{' '}
														</div>
													</td>
												</tr>
												<tr></tr>
												<tr>
													<td>
														<div className='d-flex flex-column'>
															{' '}
															<span className='heading d-block'>
																Reason For Visit
															</span>{' '}
															<span
																className='subheadings'
																id='info_visiting_reason'>
																{appointment?.reasonForVisit}
															</span>{' '}
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div id='extra_documents_space'>
															<span className='heading d-block'>
																Extra Documents
															</span>
															{appointment?.medicalFiles?.map(file => (
																<a
																	href={`http://localhost:8000${file}`}
																	target='_blank'>
																	<img
																		src={`http://localhost:8000${file}`}
																		alt=''
																	/>
																</a>
															))}
														</div>
													</td>
												</tr>
												{appointment?.prescription?.length > 0 && (
													<tr>
														<td>
															<div id='presc_documents_space'>
																<span className='heading d-block'>
																	Prescriptions
																</span>
																{appointment?.prescription?.map(file => (
																	<a
																		href={`http://localhost:8000${file}`}
																		target='_blank'>
																		<img
																			src={`http://localhost:8000${file}`}
																			alt=''
																		/>
																	</a>
																))}
															</div>
														</td>
													</tr>
												)}
												{!profile?.isPatient && (
													<tr>
														<td>
															<div className='d-flex flex-column'>
																{' '}
																<span
																	className='heading d-block'
																	onClick={e => handleUpload(e)}>
																	Upload Prescription
																</span>{' '}
																<input
																	type='file'
																	name='prescription_docs'
																	id='prescription_docs'
																	onChange={e => setFiles(e.target.files)}
																	multiple
																/>
															</div>
														</td>
													</tr>
												)}
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	) : (
		<></>
	);
}
