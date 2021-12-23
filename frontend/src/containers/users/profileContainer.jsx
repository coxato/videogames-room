import React,{ Component } from 'react';
import { apiHost } from '../../config/config';

//import { Redirect } from 'react-router-dom';
// components
import Profile from '../../components/users/profile';
import Loader from '../../components/commons/loader';
import SessionPlease from '../../components/users/sessionPlease';
import PortalModal from '../../components/commons/portal';
import CheckHourCode from '../../components/codes/checkHourCodes';
import CreatePrizeCode from '../../components/codes/createPrizeCode';
// styles
import './styles/profileContainer.css';

class ProfileContainer extends Component{

	state = {
		loading: true,
		error: null,
		user: {},
		auth: false,
		modalHourIsVisible: false,
		modalPrizeIsVisible: false,
		horasNecesarias: 0,
		eleccionPremio: ''
	}

	// fetch the user data
	fetchData = async () => { 
		try{
 
			let id = this.props.match.params.id || "null";
			console.log('esto es id en react', id);
			// check user token and get user data
			let responseUser = await fetch(`${apiHost}/api/users/${id}`, {
				headers: {
					'x-access-token': sessionStorage.getItem("token")
				}
			});
			let jsonUser = await responseUser.json();
			// get neccesary hours to win a prize
			let responseDataCodes = await fetch(`${apiHost}/api/data/codes`);
			let jsonDataCode = await responseDataCodes.json();
			console.log("lo que trae ", jsonUser, jsonDataCode);
			this.setState({
				loading:false, 
				user: jsonUser,
				error:null, 
				auth: jsonUser.auth === false ? false : true, // auth is always false if is verifying the token, so if not return auth key, the token is valid
				horasNecesarias: jsonDataCode.divisorPremio,
				eleccionPremio: jsonDataCode.eleccionPremio
			});

		}catch(err){
			console.log(err);
		}
	}

	componentDidMount(){
		// user is logged
		if(sessionStorage.getItem("token")) this.fetchData();
		// user is not logged
		else {
			this.setState({auth: false, loading: false})
		}
	}

	// show and hide the portal modal
	// show
	onModalOpen = modalType => { this.setState({ [modalType]: true }) }
	// hide
	onModalClose = modalType => { this.setState({ [modalType]: false}) }



	render(){
		let { loading, user, auth, modalHourIsVisible, modalPrizeIsVisible, horasNecesarias, eleccionPremio } = this.state;
		return(
			<div className="profile-super-container">
				{
					loading
					?
					<Loader />
					:
					auth
					?
					<div className="profile-user-container">
						<Profile userData={user} onModalOpen={this.onModalOpen} horasNecesarias={horasNecesarias} eleccionPremio={eleccionPremio}/>
						
						{/* modal for hours */}
						<PortalModal modalIsVisible={modalHourIsVisible} onModalClose={this.onModalClose} modalCategory="modalHourIsVisible">
							<CheckHourCode horasNecesarias={horasNecesarias}/>
						</PortalModal>
						
						{/* modal for prize */}
						<PortalModal modalIsVisible={modalPrizeIsVisible} onModalClose={this.onModalClose} modalCategory="modalPrizeIsVisible">
							<CreatePrizeCode horasNecesarias={horasNecesarias} horasUser={user.contadorHoras} eleccionPremio={eleccionPremio}/>
						</PortalModal>
					</div>
					:
					<div>
						{/* require user session if token is not valid */}
						<SessionPlease state={
							{
								redirectTo: '/profile'
							}
						} />
					</div>
				}
			</div>
		)
	}


}

export default ProfileContainer;