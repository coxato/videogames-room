import React, { Component } from 'react';
// components
// import Loader from '../components/commons/loader';
import LoginForm from '../components/commons/loginForm';
// style
import './styles/loginContainer.css';

class LoginContainer extends Component{

	state = {
		
	}
	

	render(){
		return(
			<div className="loginForm-container">

				<LoginForm />

			</div>
		)
	
	}
}

export default LoginContainer;