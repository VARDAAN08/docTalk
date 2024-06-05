import React from 'react';
import './navbar.css';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavbarPatient() {
	const navigate = useNavigate();
	const handleLogout = () => {
		navigate(`/`, { replace: true });
		localStorage.removeItem('doctalk');
	};
	return (
		<div>
			<div className='navbar' style={{ backgroundColor: '#219F94' }}>
				<input type='checkbox' id='nav-check' />
				<div className='nav-header'>
					<div className='nav-title'>
						<Link to='/'>
							<img width='70px' src={logo} alt='' />
						</Link>
            <span style={{color:'white', marginLeft: '20px'}}>DocTalk</span>
            </div>
				</div>
				<div className='nav-btn'>
					<label htmlFor='nav-check'>
						<span></span>
						<span></span>
						<span></span>
					</label>
				</div>

				<div className='nav-links'>
					<Link to='/patient/doctorlist'>Doctors</Link>
					<Link to='/patient'>Appointment History</Link>
					<Link to='/patient/uploadDocs'>Upload Docs</Link>
					<Link to='/patient/viewDocs'>View Docs</Link>
					<Link to='/patient/profile'>Profile</Link>
					<Link to='/' onClick={handleLogout}>
						Logout
					</Link>
				</div>
			</div>
		</div>
	);
}
