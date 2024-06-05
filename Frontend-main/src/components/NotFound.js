import React from 'react';
import Error from '../assets/images/error.png';
// import '../../styles/constants.scss';
const NotFound = () => {
	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
        position: 'relative',
        zIndex: '10',
				alignItems: 'center',
				justifyContent: 'center'
			}}>
			<img src={Error} width='600px' height='auto' alt='error page' />
		</div>
	);
};

export default NotFound;
