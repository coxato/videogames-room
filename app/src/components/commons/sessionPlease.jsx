import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// style
import './styles/sessionPlease.css';

function SessionPlease({state}){


	{/* eliminate the token if exist, because user is not authorized */}
	// { sessionStorage.getItem("token") ? sessionStorage.setItem("token", "") : null }
 
	return(
		<div className="sessionPlease-container columns is-centered">
			<div className="column is-half">
				<div className="card has-text-centered marginFix">
					<h1 className="title">debes iniciar sesión para ver esto</h1>
					<Link className="button is-centered is-link"
						to={
							{
								pathname: "/login",
								state
							}
						}
					>ir a iniciar sesión
					</Link>
				</div>
			</div>
		</div>
	)
}

export default SessionPlease;