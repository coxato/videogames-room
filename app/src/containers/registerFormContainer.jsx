import React, { Component } from 'react';
// components
// import Loader from '../components/commons/loader';
import RegisterForm from '../components/commons/registerForm';
// style
import './styles/registerContainer.css';

class RegisterContainer extends Component{
 
	state = {
		allOk: true,
		nombre: '',
		apellido: '',
		email: '',
		username: '',
		password: '',
		passwordConfirm: '',
		errorMsg: []
	}

	// check the form data
	checkData = () => {
		let errors = [];
		let { password, passwordConfirm, nombre, apellido, email } = this.state;
		if(password != passwordConfirm) errors.push("las contraseñas son diferentes");
		if(password.length < 6) errors.push("la contraseña debe tener al menos 6 caracteres");
		if(nombre=='' || apellido==''|| email=='') errors.push("rellena todos los campos")
		if(errors.length > 0){
			this.setState({ errorMsg: errors });
		}else{
			return true;
		}
	}

	handleOnChange = (ev) => {
		let key = ev.target.name, value = ev.target.value;
		this.setState({ [key]: value });
	}

	// create and save user
	signup = async () => {
		if(this.checkData()){
			try{

				let response = await fetch('/api/users/signup', {
					method: 'POST',
					body: JSON.stringify(this.state),
					headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
                	}
				});

				let created = await response.json();
				console.log(created);
				this.props.history.push('/login');


			}catch(err){
				console.log(err)
			}
		}
		// paswords are not equals
		else{
			this.setState({ allOk: false });
		}
	}

	// hide the notifications errors of form
	hideErrors = (ev) => ev.target.parentElement.remove();

	
	render(){
		return(
			<div className="register-container">
				{
					!this.state.allOk 
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
				
				<div className="form-register-container">
					<RegisterForm handleChange={this.handleOnChange} signup={this.signup} />
				</div>
			</div>
		)
	}
}

export default RegisterContainer;