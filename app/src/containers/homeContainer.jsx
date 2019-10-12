import React, { Component } from 'react';
// components
import Hero from '../components/commons/landingHero';
import Description from '../components/commons/description';
import Gallery from '../components/commons/gallery';
import Horario from '../components/commons/horario';
import Loader from '../components/commons/loader';

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
			let response = await fetch("/api/admin/data/general");
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
				<Gallery />
				<Horario horario={horario} />
			</div>
		)
	}
}

export default Home;