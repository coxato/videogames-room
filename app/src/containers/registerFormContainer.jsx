import React, { Component } from 'react';
// components
// import Loader from '../components/commons/loader';
import RegisterForm from '../components/commons/registerForm';
// style
// import './styles/createCodes.css';

class RegisterContainer extends Component{

	state = {
		allOk: true,
		nombre: '',
		apellido: '',
		email: '',
		password: '',
		passwordConfirm: '',
	}

	// check the form data
	checkData = () => {
		// check more if is necessary
		return this.state.password === this.state.passwordConfirm;
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


			}catch(err){
				console.log(err)
			}
		}
		// paswords are not equals
		else{
			this.setState({ allOk: false });
		}
	}

	

	render(){
		return(
			<div className="register-container">
				{
					!this.state.allOk 
					&&
					<div className="box has-background-danger title">
						<div className="delete"></div>
						las contraseñas no son iguales
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