import React from 'react';
import { StaticRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
// import ReactDOMServer from 'react-dom/server'
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


function Appssr(){

	let style = {
		minHeight: '100vh',
		display: 'flex',
		flexDirection: 'column',
		background: 'rgb(237,237,237)',
		background: 'linear-gradient(143deg, rgba(237,237,237,1) 23%, rgba(97,97,97,1) 100%)',
	}

   	return(
   		<div className="app-container" style={style}>
			<StaticRouter location={window.location.pathname} context={{}}>
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
			</StaticRouter>
   		</div>
   )
}

export default Appssr;
