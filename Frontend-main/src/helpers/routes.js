import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { useUser } from './../context/User.context';
import { useProfile } from './../context/Profile.context';

export const AdminRoute = ({ ...routeProps }) => {
	const { user } = useUser();
	console.log(user);

	if (!user) {
		return <Navigate to='/' />;
	}
	return <Route {...routeProps} />;
};

export const DoctorRoute = ({ ...routeProps }) => {
	const { user } = useUser();
	console.log(useUser());

	if (user && user.role === 'Doctor') {
		return <Navigate to='/doctor' />;
	} else {
		<Navigate to='/patient' />;
	}
};

export const PrivateRoute = ({ ...routeProps }) => {
	const { profile } = useProfile();
	console.log(profile);

	if (profile && !profile.isPatient) {
		return <Navigate to='/doctor' />;
	} else if (profile && profile.isPatient) {
		return <Navigate to='/patient' />;
	}
	return <Navigate to='/' />;
};

export const PublicRoute = ({ children }) => {
	const { profile } = useProfile();
	console.log(profile);

	if (profile && !profile.isPatient) {
		return <Navigate to='/doctor' />;
	} else if (profile && profile.isPatient) {
		return <Navigate to='/patient' />;
	}
	return <div>{children}</div>;
};
