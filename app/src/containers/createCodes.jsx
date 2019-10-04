import React, { Component } from 'react';
// components
import Loader from '../components/commons/loader';
import CodesInfo from '../components/admin/codes/codesInfo';
// style
import './styles/createCodes.css';

class CreateCodes extends Component{

	state = {
		loading: true,
		error: null,
		hourCodes: [],
		prizeCodes: [],
	}

	// call the api with this.fetchData method
	componentDidMount(){
		this.fetchData();
	}

	// fetch the codes
	async fetchData(){
		this.setState({ loading: true, error: null })
		try{
			let response = await fetch('/api/admin/data/codes');
			let json = await response.json();
			let { hourCodes, prizeCodes } = json;
			this.setState({
				hourCodes,
				prizeCodes,
				loading: false
			})
		}catch(err){
			this.setState({ loading: false, error: err })
		}
	}


	// handle function to create codes
	handleCreateCodes = async (codeType) => {
		this.setState({ loading: true , error: null });
		try{
			// create codes with API
			let response = await fetch(`/api/admin/create/code/hora`);
			let created = await response.text();
			// get all the codes to set the state
			let allCodes = await fetch('/api/admin/data/codes');
			let data = await allCodes.json();
			this.setState({ loading: false , error: null, hourCodes: data.hourCodes });
			
		}catch(err){
			this.setState({ loading: false, error: err });
		}
	}


	render(){
		let { loading, error } = this.state;
		
		if(loading) return <Loader />;
		
		if(error) return <h1>the ERROR is: {error}</h1>

		return(
			<div className="AdminCodes-container">

				<button className="button is-large is-success" onClick={this.handleCreateCodes}>crear nuevos códigos</button>
				<CodesInfo {...this.state} />

			</div>
		)
	}
}

export default CreateCodes;