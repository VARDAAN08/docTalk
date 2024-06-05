import React, { useState } from 'react';
import './profile.css';
import { useUser } from '../../context/User.context';
import docImg from '../../assets/images/doc_profle.png';

export default function ProfileDoctor() {
	const [doctor, setDoctor] = useState({
		name: 'test',
		email: 'test@gmail.com',
		phn: '1239281376',
		clinicName: 'abc clinic',
		speciality: 'heart',
		description: 'weuihrywejkinfbrui3ergfguieghrfuih',
		clinicAddress: 'abc street delhi',
		clinicMap: 'wefhwejkifbnerwuihfuierwhf',
		pic: ''
	});

	const { user } = useUser();
	console.log(user);
	return (
		<div>
			<div className='container rounded bg-white mt-5 mb-5'>
				<div className='row'>
					<div className='col-md-3 border-right'>
						<div className='d-flex flex-column align-items-center text-center p-3 py-5'>
							<img
								className='rounded-circle mt-5'
								width='150px'
								src={
									user.pic !== '' ? `http://localhost:8000${user.pic}` : docImg
								}
								alt=''
							/>
							<span className='font-weight-bold'>{user.name}</span>
							<span className='text-black-50'>{user.email}</span>
							<span> </span>
						</div>
					</div>
					<div className='col-md-8 border-right'>
						<div className='p-3 py-5'>
							<div className='d-flex justify-content-between align-items-center mb-3'>
								<h4 className='text-right'>Profile Settings</h4>
							</div>
							<form>
								<div className='row mt-2'>
									<div className='col-md-6'>
										<label className='labels'>Name</label>
										<input
											type='text'
											className='form-control'
											name='name_field'
											value={user.name}
											onChange={e =>
												setDoctor({ ...doctor, name: e.target.value })
											}
										/>
									</div>
									<div className='col-md-6'>
										<label className='labels'>Mobile Number</label>
										<input
											type='text'
											className='form-control'
											name='phn_field'
											value={user.phn}
											onChange={e =>
												setDoctor({ ...doctor, phn: e.target.value })
											}
										/>
									</div>
								</div>
								<div className='row mt-2'>
									<div className='col-md-6'>
										<label className='labels'>Clinic Name</label>
										<input
											type='text'
											className='form-control'
											name='clinic_name_field'
											value={user.clinicName}
											onChange={e =>
												setDoctor({
													...doctor,
													clinicName: e.target.value
												})
											}
										/>
									</div>
								</div>
								<div className='col-md-12'>
									<label className='labels'>Speciality</label>
									<input
										type='text'
										className='form-control'
										name='speciality_field'
										value={user.speciality}
										onChange={e =>
											setDoctor({ ...doctor, speciality: e.target.value })
										}
									/>
								</div>
								<div className='col-md-12'>
									<label className='labels'>Description</label>
									<textarea
										className='form-control'
										name='desc_field'
										cols='10'
										rows='4'
										onChange={e =>
											setDoctor({ ...doctor, description: e.target.value })
										}
										value={user.description}></textarea>
								</div>

								<div className='col-md-12'>
									<label className='labels'>Clinic Address</label>
									<textarea
										className='form-control'
										name='clinic_address_field'
										cols='10'
										rows='4'
										onChange={e =>
											setDoctor({
												...doctor,
												clinicAddress: e.target.value
											})
										}
										value={user.clinicAddress}></textarea>
								</div>

								<div className='col-md-6'>
									<label className='labels'>Clinic Location Link</label>
									<input
										type='text'
										className='form-control'
										name='clinic_loc_field'
										value={user.clinicMap}
										onChange={e =>
											setDoctor({
												...doctor,
												clinicMap: e.target.value
											})
										}
									/>
								</div>

								{/* <div className='mt-5 text-center'>
									<button
										className='btn btn-primary profile-button'
										type='submit'
										style={{
											backgroundColor: '#219F94 !important',
											color: 'white'
										}}>
										Save Profile
									</button>
								</div> */}
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
