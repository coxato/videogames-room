import React,{ Component } from 'react';
// components
import Profile from '../components/commons/profile';
import Loader from '../components/commons/loader';
// styles
import './styles/profileContainer.css';

class ProfileContainer extends Component{

	state = {
		loading: true,
		error: null,
		user: {}
	}

	fetchData = async () => {
		try{

			// id 5d96eeda0b711518e8b86e1f

			let id = this.props.match.params.id;
			let responseUser = await fetch(`/api/users/${id}`);
			let user = await responseUser.json();
			console.log("el user que trae ", user)
			this.setState({loading:false, user , error:null});

		}catch(err){
			console.log(err);
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	render(){
		let { loading, user } = this.state;
		return(
			
				loading
				?
				<Loader />
				:
				<div className="profile-user-container">
					<Profile userData={user} />
				</div>
			
		)
	}


}

export default ProfileContainer;