import React, { Component } from 'react';
import { apiHost } from '../../config/config';

// components
// import Loader from '../components/commons/loader';
import LoginForm from '../../components/users/loginForm';
// style
import './styles/loginContainer.css';

// login and redirect
class LoginContainer extends Component{

	state = {
		allOk: true,
		errorMsg: [],
		authErrors: [],
		auth: false,
		email: '',
		password: ''
	}

	

	// save inputs values in state
	handleOnChange = (ev) => {
		let key = ev.target.name, value = ev.target.value;
		this.setState({ [key]: value });
	}

	checkForm = () => {
		let errors = [];
		let { email, password } = this.state;
		if(email == '' || password == '') errors.push('debes llenar todos los campos');
		if(errors.length){
			this.setState({ errorMsg: errors, allOk: false });
			return false;
		}
		// the form is valid
		return true;
	}

	// login the user only if is valid
	// and save the token in a cookie
	login = async () => {
		if( this.checkForm() ){
			let { email, password } = this.state;
			console.log("########## tratando de hacer peticiones post a esta ruta ", `${apiHost}api/users/login`);
			try{
				let response = await fetch(`${apiHost}/api/users/login`, {
					method: 'POST',
					body: JSON.stringify({ email, password}),
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					}
				});
				// user valid with token or not authorized
				let json = await response.json();
				// if authorization is ok
				if(json.auth){
					// save the user token in sessionStorage
					sessionStorage.setItem('token', json.token);
					// redirect user
					const LinkState = this.props.location.state;
					// check if LinkState has a value
					const redirectTo = LinkState ? LinkState.redirectTo : '/profile';
					// this.props.history.push(redirectTo);
					window.location.href = redirectTo;
				}
				// user is not authorized
				else{
					this.setState({authErrors: ['correo y/o contraseña incorrectos']});
				}

			}catch(err){
				console.log('error while login user: ', err);
			}
		}
	}

	// hide the notifications errors of form
	hideErrors = (ev) => ev.target.parentElement.remove();

	
	render(){
		return(
			<div className="register-container">
				{/* form errors */}
				{
					this.state.errorMsg.length > 0
					&&
					<div className="box has-background-light title">
						<div className="delete" onClick={this.hideErrors}></div>
						{
							this.state.errorMsg.map( (err, idx) => (
								<div className="box has-background-danger" key={idx}>
									<p className="has-text-centered subtitle">{err}</p>
								</div>
							))
						}
					</div>
				}
				{/* email or password incorrect */}
				{
					this.state.authErrors.length > 0
					&&
					<div className="box has-background-light title">
						<div className="delete" onClick={this.hideErrors}></div>
						{
							this.state.authErrors.map( (err, idx) => (
								<div className="box has-background-danger" key={idx}>
									<p className="has-text-centered subtitle">{err}</p>
								</div>
							))
						}
					</div>
				}
				{/* login form */}
				<div className="form-register-container">
					<LoginForm handleChange={this.handleOnChange} login={this.login} />
				</div>
			</div>
		)
	}
}

export default LoginContainer;