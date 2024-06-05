/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
	const navigate = useNavigate();
	const [profile, setProfile] = useState(null);

	const token = localStorage.getItem('doctalk');
  console.log(token);

	function fetchProfile() {
		if (token) {
			const decodedJwt = jwt_decode(token);
			// console.log(decodedJwt);
			// if (Date.now() >= decodedJwt.exp * 1000) {
			// 	// console.log(false);
			// 	localStorage.removeItem('doctalk');
			// 	navigate('/');
			// } else {
				// console.log(false);
				const userData = {
					userId: decodedJwt.id,
					isPatient: decodedJwt.isPatient
				};

				setProfile(userData);
			// }
		} else {
			setProfile(null);
		}
	}

	useEffect(() => {
		fetchProfile();
	}, [token]);

	console.log(profile);

	return (
		<ProfileContext.Provider value={{ profile, setProfile }}>
			{children}
		</ProfileContext.Provider>
	);
};

export const useProfile = () => useContext(ProfileContext);
