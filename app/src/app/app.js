import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
// pages
import AdminPage from '../pages/admin';
import RegisterPage from '../pages/register';
// nav menues
import NavAdmin from '../components/admin/adminNav';

// const NotFound = () => <h1 className="title">not found</h1>
import './styles/app.css';

function App(){

	return(
		<div className="app-container">
			<BrowserRouter>

					<RegisterPage />
			  		<AdminPage />

			  	{/*	<Switch>
			  			<Route component={NotFound} />
			  		</Switch>  */}

			</BrowserRouter>
		</div>
	)
}

export default App;
