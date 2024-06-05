import axios from 'axios';
import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState
} from 'react';
import { toast } from 'react-toastify';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [isUserLoading, setIsUserLoading] = useState(true);

	const loadUser = useCallback(async () => {
		const token = localStorage.getItem('doctalk');
    console.log(token);

		if (token) {
			await axios
				.get(`/auth/profile`, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				})
				.then(res => {
					console.log(res.data.user);
					setUser(res.data.user);
					setIsUserLoading(false);
				})
				.catch(err => {
					toast.error('Error occured', err);
					console.log(err);
					setIsUserLoading(false);
				});
		} else {
			setIsUserLoading(false);
			setUser(null);
		}
	}, []);

	useEffect(() => {
		loadUser();
	}, [loadUser]);

	return (
		<UserContext.Provider value={{ user, isUserLoading, setUser, loadUser }}>
			{children}
		</UserContext.Provider>
	);
};

export const useUser = () => useContext(UserContext);
