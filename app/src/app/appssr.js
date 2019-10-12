import React from 'react';
import { StaticRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
// import ReactDOMServer from 'react-dom/server'
// pages
import LandingPage from '../pages/home';
import AdminPage from '../pages/admin';
import RegisterPage from '../pages/register';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';


// nav and footer
import Nav from '../components/commons/nav';
import Footer from '../components/commons/footer';

import './styles/app.css';


function Appssr(){

	let admin = false;

	let style = {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		background: '#eaeaea'
	}

   	return(
   		<div className="app-container" style={style}>
			<StaticRouter location={window.location.pathname} context={{}}>
				{ !window.location.pathname.match(/admin/) && <Nav /> }
				<LandingPage />
				<RegisterPage />
		  		<LoginPage />
		  		<ProfilePage />
		  		<AdminPage />
			  	{/*	<Switch>
			  			<Route component={NotFound} />
			  		</Switch>  */}
				{ !window.location.pathname.match(/admin/) && <Footer /> }
			</StaticRouter>
   		</div>
   )
}

export default Appssr;
