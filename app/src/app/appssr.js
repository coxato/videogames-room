import React from 'react';
import { StaticRouter } from 'react-router';
import { Switch, Route } from 'react-router-dom';
// import ReactDOMServer from 'react-dom/server'
// pages
import AdminPage from '../pages/admin';
import RegisterPage from '../pages/register';
// nav menues
import NavAdmin from '../components/admin/adminNav';

import './styles/app.css';

// const NotFound = () => <h1 className="title">not found</h1>


function Appssr(){

	let admin = false;

   	return(
   		<div className="app-container">
			<StaticRouter location={window.location.pathname} context={{}}>
				
					<RegisterPage />
			  		<AdminPage />
			  	{/*	<Switch>
			  			<Route component={NotFound} />
			  		</Switch>  */}
				
			</StaticRouter>
   		</div>
   )
}

export default Appssr;
