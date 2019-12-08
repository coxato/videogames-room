import React, { Component } from 'react';
import { apiHost } from '../../config/config'; 
// components
// import Loader from '../components/commons/loader';
import SessionPlease from '../../components/users/sessionPlease';

class AdminLoginContainer extends Component{

	state = {
		isAdmin: false,
		errors: [],
		tokenExist: false
	}

	componentDidMount(){
		this.checkToken();
	}

	checkToken = async () => {
		const token = sessionStorage.getItem("token");
		// token exist
		if(token){
			// check if user token is admmin
			let responseIsAdmin = await fetch(`${apiHost}/api/users/check/admin`, {
				headers: {
					'x-access-token': token
				}
			});
			let user = await responseIsAdmin.json();
			// success admin login
			if(user.auth) {
				// bad practice, but adminNav is visible
				window.location.href = "/admin/general";
				// good practice, but the adminNav is not render
				// fix this later, maybe with redux
				// this.props.history.push("/admin/general");
			}
			// user is not admin
			else {
				// bad practice, but normal nav is visible
				window.location.href = "/";
				// good practice, but the normal nav is not render
				// fix this later, maybe with redux
				// this.props.history.push("/");
			}
		}
		// token does not exist
		// else{

		// }
	}



	render(){
		// let { isAdmin, errors, tokenExist } = this.state; 
		return(
			<SessionPlease state={
				{
					redirectTo: '/admin'
				}
			} />
		)
	}
}

export default AdminLoginContainer;