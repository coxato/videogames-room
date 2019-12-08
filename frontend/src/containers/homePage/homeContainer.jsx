import React, { Component } from 'react';
import { apiHost } from '../../config/config';
// components
import Hero from '../../components/homePage/landingHero';
import Description from '../../components/homePage/description';
import Mapa from '../../components/homePage/mapa';
import Horario from '../../components/commons/horario';
import Loader from '../../components/commons/loader';

class Home extends Component{

	state = {
		loading: true,
		error: null,
		horario: null
	}

	componentDidMount(){
		this.fetchData();
	}
 
	fetchData = async () => {
		try{
			let response = await fetch(`${apiHost}/api/admin/data/general`);
			let data = await response.json();
			this.setState({ horario: data.horario, loading: false});	
		}catch(err){
			console.log(err);
			this.setState({ error: null });
		}
	}

	render(){
		let { horario, loading } = this.state; 
		return(
			loading
			?
			<Loader />
			:
			<div className="home-landing-container">
				<Hero />
				<Description />
				<Mapa />
				<Horario horario={horario} />
			</div>
		)
	}
}

export default Home;