import React from 'react';
import { Link } from 'react-router-dom';
import '../navbar/navbar.css';
import logo from '../../assets/images/logo.png';

export default function Navbar() {
	return (
		<>
			<div className='navbar' style={{ backgroundColor: '#219F94' }}>
				<input type='checkbox' id='nav-check' />
				<div className='nav-header'>
					<div className='nav-title'>
						<Link to='/'>
							<img style={{width:'60px'}} src={logo} alt='' />
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
					<Link to='/'>Login</Link>
					<Link to='/signup'>Sign Up</Link>
				</div>
			</div>
		</>
	);
}
