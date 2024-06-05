import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProfileProvider } from './context/Profile.context';
import { PublicRoute, PrivateRoute } from './helpers/routes';
import LandingPage from './pages/LandingPage';
import NotFound from './components/NotFound';
import Doctor from './pages/Doctor';
import Patient from './pages/Patient';
import Signup from './components/signup/Signup';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("doctalk");

function App() {
	return (
		<>
			<BrowserRouter>
				<ProfileProvider>
					<Routes>
						<Route
							exact
							path='/'
							element={
								<PublicRoute>
									<LandingPage />
								</PublicRoute>
							}
						/>
						<Route
							exact
							path='/doctor/*'
							element={
								// <PrivateRoute>
								// </PrivateRoute>
									<Doctor />
							}
						/>
						<Route
							exact
							path='/patient/*'
							element={
								// <PrivateRoute>
								// </PrivateRoute>
									<Patient />
							}
						/>

						<Route path='/signup' element={<Signup />} />
						<Route path='*' element={<NotFound />}></Route>
					</Routes>
				</ProfileProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
