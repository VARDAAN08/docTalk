/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import './modal.css';

export default function DoctorModal({ doctor }) {
	console.log(doctor);
	return (
		<div
			className='modal fade'
			id='exampleModal'
			tabIndex='-1'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'>
			<div className='modal-dialog modal-xl modal-fullscreen-lg-down'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h5 className='modal-title' id='exampleModalLabel'>
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
							<div className='col-md-8 border-right'>
								<div className='status p-3'>
									<table className='table table-borderless'>
										<tbody>
											<tr>
												<td>
													<div className='d-flex flex-column'>
														{' '}
														<span className='heading d-block'>
															Clinic Name
														</span>{' '}
														<span className='subheadings' id='info_clinic_name'>
															{doctor.clinicName}
														</span>{' '}
													</div>
												</td>
												<td>
													<div className='d-flex flex-column'>
														{' '}
														<span className='heading d-block'>
															Speciality
														</span>{' '}
														<span className='subheadings' id='info_speciality'>
															{doctor.speciality}
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
															Clinic Address
														</span>{' '}
														<span
															className='subheadings'
															id='info_clinic_address'>
															{doctor.clinicAddress}
														</span>{' '}
													</div>
												</td>
												<td colSpan='2'>
													<div className='d-flex flex-column'>
														{' '}
														<span className='heading d-block'>
															Doctor Description
														</span>{' '}
														<span className='subheadings' id='info_doc_desc'>
															{doctor.description}
														</span>
													</div>
												</td>
											</tr>
											<tr>
												<td>
													<div className='d-flex flex-column'>
														{' '}
														<span className='heading d-block'>
															Direction
														</span>{' '}
														<span className='d-block subheadings'>
															Get direction by using
														</span>{' '}
														<span className='d-flex flex-row'>
															{' '}
															<a
																href={doctor.clinicMap}
																id='info_clinic_loc'
																target='_blank'>
																{' '}
																<img
																	src='https://img.icons8.com/color/100/000000/google-maps.png'
																	className='rounded'
																	width='30'
																	alt=''
																/>
															</a>
														</span>{' '}
													</div>
												</td>
											</tr>
										</tbody>
									</table>
									<div id='extra_documents_space'>
										<span className='heading d-block'>Documents</span>
										<a href={`http://localhost:8000${doctor.documents}`} target='_blank'>
											<img src={`http://localhost:8000${doctor.documents}`} style={{maxWidth: '30%'}} alt='' />
										</a>
									</div>
								</div>
							</div>
							<div className='col-md-4'>
								<div className='p-2 text-center'>
									<div className='profile'>
										{' '}
										<img
											id='info_profile_pic'
											src={`http://localhost:8000${doctor.pic}`}
											width='100'
											style={{ height: '100px' }}
											className='rounded-circle img-thumbnail'
											alt=''
										/>{' '}
										<span
											className='d-block mt-3 font-weight-bold'
											id='info_doc_name'>
											{doctor.name}
										</span>{' '}
									</div>
									<div className='about-doctor'>
										<table className='table table-borderless'>
											<tbody>
												<tr>
													<td>
														<div className='d-flex flex-column'>
															{' '}
															<span className='heading d-block'>
																Doctor ID
															</span>{' '}
															<span
																className='subheadings'
																style={{ fontSize: '8px' }}
																id='info_doc_id'>
																{doctor._id}
															</span>{' '}
														</div>
													</td>
													<td>
														<div className='d-flex flex-column'>
															{' '}
															<span className='heading d-block'>
																Phone No
															</span>{' '}
															<span className='subheadings' id='info_doc_phn'>
																{doctor.phn}
															</span>{' '}
														</div>
													</td>
												</tr>
												<tr>
													<td>
														<div className='d-flex flex-column'>
															{' '}
															<span className='heading d-block'>
																Email
															</span>{' '}
															<span className='subheadings' id='info_doc_email'>
																{doctor.email}
															</span>{' '}
														</div>
													</td>
													<td></td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
