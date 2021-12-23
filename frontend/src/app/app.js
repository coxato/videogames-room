import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// pages
import LandingPage from '../pages/home';
import AdminPage from '../pages/admin';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import LoginAdmin from '../pages/loginAdmin';
import ProfilePage from '../pages/profile';

// nav and footer
import Nav from '../components/homePage/nav';
import Footer from '../components/homePage/footer';

import './styles/app.css';

function App(){

	let style = {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		background: 'rgb(237,237,237)',
		// background: 'linear-gradient(143deg, rgba(237,237,237,1) 23%, rgba(97,97,97,1) 100%)',
	}

	return(
		<div className="app-container" style={style}>
			<BrowserRouter>

            { !window.location.pathname.match(/admin/) && <Nav /> }
					<LandingPage />
					<RegisterPage />
					<LoginPage />
					<ProfilePage />
					<LoginAdmin />
			  		<AdminPage />
			 { !window.location.pathname.match(/admin/) && <Footer /> }
			</BrowserRouter>
		</div>
	)
}

export default App;
