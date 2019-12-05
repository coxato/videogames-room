import React from 'react';
import { Link } from 'react-router-dom';

function NotAuth({redirectTo}) {
	return(
		<div className="notauth-container has-text-centered">
			<h1 className="title">no estás autorizado</h1>
			<Link to={redirectTo} className="button is-link">iniciar sesión</Link>
		</div>
	)
}

export default NotAuth;