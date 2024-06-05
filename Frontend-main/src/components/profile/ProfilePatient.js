import React, { useState } from 'react';
import { useUser } from '../../context/User.context';
import './profile.css';

export default function ProfilePatient() {
	const [user, setUser] = useState({
		name: 'test',
		email: 'test@gmail.com',
		gender: 'male',
		phone: '1239281376',
		age: '18'
	});
	const patient = useUser();
	// console.log(patient.user);
	return (
		<>
			<div className='container rounded bg-white mt-5 mb-5'>
				<div className='row'>
					<div className='col-md-3 border-right'>
						<div className='d-flex flex-column align-items-center text-center p-3 py-5'>
							<img
								className='rounded-circle mt-5'
								width='150px'
								src='https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg'
								alt=''
							/>
							<span className='font-weight-bold'>{patient.user.name}</span>
							<span className='text-black-50'>{patient.user.email}</span>
							<span> </span>
						</div>
					</div>
					<div className='col-md-8 border-right'>
						<div className='p-3 py-5'>
							<div className='d-flex justify-content-between align-items-center mb-3'>
								<h4 className='text-right'>Profile Settings</h4>
							</div>
							<form>
								<div className='col-md-12'>
									<label className='labels'>Name</label>
									<input
										type='text'
										className='form-control'
										name='name_field'
										value={patient.user.name}
										onChange={e => setUser({ ...user, name: e.target.value })}
									/>
								</div>
								<div className='col-md-12'>
									<label className='labels'>Mobile Number</label>
									<input
										type='text'
										className='form-control'
										name='phone_field'
										value={patient.user.phn}
										onChange={e => setUser({ ...user, phn: e.target.value })}
									/>
								</div>

								<div className='col-md-6'>
									<label className='labels'>Age</label>
									<input
										type='number'
										className='form-control'
										name='age_field'
										value={patient.user.age}
										onChange={e => setUser({ ...user, age: e.target.value })}
									/>
								</div>
								<div className='col-md-6'>
									<label className='labels'>Gender</label>
									<input
										type='text'
										className='form-control'
										name='gender_field'
										value={patient.user.gender}
										onChange={e => setUser({ ...user, gender: e.target.value })}
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
		</>
	);
}
