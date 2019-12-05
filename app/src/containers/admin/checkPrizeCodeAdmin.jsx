import React,{ Component } from 'react';
// components
import Loader from '../../components/commons/loader';
import SessionPlease from '../../components/users/sessionPlease';
import CheckPrizeCode from '../../components/codes/checkPrizeCode';
// utilities
import checkCode from '../../../utilities/checkCode';
// styles

class CheckPrizeAdmin extends Component{
 
	state = {
		loading: true,
		error: null,
		auth: false,
		success: false,
		fail: false,
		used: false,
		code: '',
		expired: false,
		verifying: false,
		expirationDate: ''
	}

	// check the prize code
	checkCodePrize = async (type, code) => {
		this.setState({ verifying: true });
		let date = new Date();
		try{
			let checked = await checkCode(type, code, date);
			console.log("que es checked en el frontend ", checked)
			this.setState({ verifying: false, ...checked })
		}catch(err){
			console.log(err);
		}
	}

	// save the code in state
	handleChange = (ev) => this.setState({ code: ev.target.value });



	componentDidMount(){
		// user is logged
		if(sessionStorage.getItem("token")) this.setState({loading: false, auth: true});
		// user is not logged
		else {
			this.setState({auth: false, loading: false})
		}
	}

	render(){
		let { loading, auth } = this.state;
		return(
			<div className="CheckPrizeAdmin-super-container">
				{
					loading
					?
					<Loader />
					:
					auth
					?
					<div className="checkCode-container">
						<CheckPrizeCode {...this.state} handleChange={this.handleChange} checkCodePrize={this.checkCodePrize}/>
					</div>
					:
					<div>
						{/* require user session if token is not valid */}
						<SessionPlease state={
							{
								redirectTo: '/admin/comprobar-codigo'
							}
						} />
					</div>
				}
			</div>
		)
	}


}

export default CheckPrizeAdmin;