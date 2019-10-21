import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// pages
import LandingPage from '../pages/home';
import AdminPage from '../pages/admin';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import LoginAdmin from '../pages/loginAdmin';
import ProfilePage from '../pages/profile';

// nav and footer
import Nav from '../components/commons/nav';
import Footer from '../components/commons/footer';

import './styles/app.css';

function App(){

	let style = {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		background: '#eaeaea'
	}

	return(
		<div className="app-container" style={style}>
			<BrowserRouter>

            { !window.location.pathname.match(/admin/) && <Nav /> }
					<LandingPage />
					<RegisterPage />
					<LoginPage />
					<ProfilePage />
					{/*<Switch>
						<Route exact path="/admin" component={AdminPage} />
					</Switch>*/}
					<LoginAdmin />
			  		<AdminPage />
			  	{/*	<Switch>
			  			<Route component={NotFound} />
			  		</Switch>  */}
			 { !window.location.pathname.match(/admin/) && <Footer /> }
			</BrowserRouter>
		</div>
	)
}

export default App;
