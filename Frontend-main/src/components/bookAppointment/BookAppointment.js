import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import './bookAppt.css';
import { useParams } from 'react-router-dom';

export default function BookAppointment() {
	const navigate = useNavigate();
	const { id } = useParams();
	const [formData, setFormData] = useState({
		DoctorId: id,
		date: '',
		time: '',
		reasonForVisit: '',
		files:[]
	});

	async function handleSubmit(e) {
		const token = localStorage.getItem('doctalk');
		e.preventDefault()
		console.log("ujjwal",formData.files.length)
		const fd = new FormData();
		for(let i=0;i<formData.files.length;i++){			
			fd.append("files", formData.files[i])
		}
		fd.append("DoctorId",formData.DoctorId );
		fd.append("date",formData.date );
		fd.append("time",formData.time );
		fd.append("reasonForVisit",formData.reasonForVisit );

		try {
			const res = await axios.post('/patient/uploadReport', fd, {
				headers: {
					Authorization: `Bearer ${token}`
				}
			});

			console.log(res);

			if (res.status === 200) {
				// localStorage.setItem('doctalk', res.data.token);
				navigate('/patient');
				toast.success('Appointment booked successfully', {
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined
				});
			}
		} catch (error) {
			console.log(error.message);
			toast.error('Appointment booking failed', {
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
			<div className='contact_form'>
				<div className='container'>
					<div className='row'>
						<div className='col-lg-10 offset-lg-1'>
							<div className='contact_form_container'>
								<div className='contact_form_title'>Book Appointment</div>
								<form
									id='appointment_form'
									enctype='multipart/form-data'
									onSubmit={handleSubmit}>
									<div className='contact_form_inputs d-flex flex-md-row flex-column justify-content-between align-items-between'>
										<input
											type='date'
											id='appointment_date'
											name='appointment_date'
											className='contact_form_name input_field'
											placeholder='Date'
											required='required'
											data-error='Date is required.'
											onChange={e =>
												setFormData({ ...formData, date: e.target.value })
											}
										/>
										<input
											type='time'
											id='appointment_time'
											name='appointment_time'
											className='contact_form_email input_field'
											placeholder='Time'
											required='required'
											data-error='Time is required.'
											onChange={e =>
												setFormData({ ...formData, time: e.target.value })
											}
										/>
										<input
											type='text'
											id='appointment_doctor'
											className='contact_form_phone input_field'
											name='appointment_doctor'
											value={id}
											placeholder='Select Doctor'
										/>
									</div>
									<div className='contact_form_text'>
										{' '}
										<textarea
											id='appointment_message'
											className='text_field contact_form_message'
											name='appointment_message'
											rows='4'
											placeholder='Describe your reason for visit'
											required='required'
											data-error='Please, write the reason'
											onChange={e =>
												setFormData({
													...formData,
													reasonForVisit: e.target.value
												})
											}></textarea>{' '}
									</div>
									<div style={{ paddingTop: '20px' }}>
										<div className='card mb-30'>
											<div className='card-body'>
												<h5 className='card-title'>Upload Medical Files</h5>
												<input
													type='file'
													style={{ width: '70%', height: '100%' }}
													className='contact_form_name input_field btn btn-sm'
													name='extra_documents'
													id='extra_documents'
													multiple
													onChange={(e)=>setFormData({...formData,files:[...e.target.files]})}
												/>
											</div>
										</div>
									</div>
									<div className='contact_form_button'>
										{' '}
										<button
											type='submit'
											className='button contact_submit_button'>
											Book
										</button>{' '}
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
				<div className='panel'></div>
			</div>
		</>
	);
}
