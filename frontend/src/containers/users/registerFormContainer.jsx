import React, { Component } from 'react';
import { apiHost } from '../../config/config';

// components
// import Loader from '../components/commons/loader';
import RegisterForm from '../../components/users/registerForm';
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
		errorMsg: [],
		showErrors: false
	}

	// check the form data
	checkData = () => {
		// set errors to zero
		this.setState({errorMsg: []});
		let errors = [];
		let { password, passwordConfirm, nombre, apellido, email } = this.state;
		if(password !== passwordConfirm) errors.push("las contraseñas son diferentes");
		if(password.length < 6) errors.push("la contraseña debe tener al menos 6 caracteres");
		if(nombre==='' || apellido===''|| email==='') errors.push("rellena todos los campos")
		if(errors.length > 0){
			this.setState({ errorMsg: errors, showErrors: true });
		}else{
			return true;
		}
	}

	handleOnChange = (ev) => {
		let key = ev.target.name, value = ev.target.value;
		this.setState({ [key]: value, showErrors: false });
	}

	// create and save user
	signup = async () => {
		if(this.checkData()){
			try{
				let response = await fetch(`${apiHost}/api/users/signup`, {
					method: 'POST',
					body: JSON.stringify(this.state),
					headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
                	}
				});

				let created = await response.json();
				if(!created.isRegister){
					this.setState({
						errorMsg: [created.message],
						allOk: false,
						showErrors: true 
					});
				}else{
					this.props.history.push('/login');
				}


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
	hideErrors = (ev) => {
		ev.target.parentElement.style.display = 'none';
		this.setState({showErrors: false});
	}

	// manage the errors display container
	componentDidUpdate(){
		const errorsContainer = document.getElementById('errorsContainer');
		
		if(this.state.showErrors){
			// check if exist at least one error
			errorsContainer.style.display = 'block';
		}else{
			// exist a error div
			if(errorsContainer) errorsContainer.style.display = 'none';
		}
		
	}
	
	render(){
		return(
			<div className="register-container">
			
				{
					!this.state.allOk 
					&&
					<div id='errorsContainer' className="box has-background-light title">
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