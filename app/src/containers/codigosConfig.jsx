import React, { Component } from 'react';
// components
import Loader from '../components/commons/loader';
import ConfigValuesCodes from '../components/admin/codes/configValuesCodes';
// style
import './styles/codigosAdmin.css';

class AdminCodes extends Component{
 
	state = {
		loading: true,
		error: null,
		divisorPremio: 0,
		duracionEnDiasDeCodigoHora: 0,
		duracionEnDiasDeCodigoPremio: 0,
		cantidadDeCodigosAGenerar: 0,
		auth: false,
	}

	// call the api with this.fetchData method
	componentDidMount(){
		this.fetchData();
	}

	// fetch the codes
	async fetchData(){
		this.setState({ loading: true, error: null })
		try{
			let response = await fetch('/api/admin/data/codes', {
				headers: {
					'x-access-token': sessionStorage.getItem("token")
				}
			});
			let json = await response.json();
			let { divisorPremio, duracionEnDiasDeCodigoHora, duracionEnDiasDeCodigoPremio, cantidadDeCodigosAGenerar } = json;
			this.setState({
				divisorPremio,
				duracionEnDiasDeCodigoHora,
				duracionEnDiasDeCodigoPremio,
				cantidadDeCodigosAGenerar,
				loading: false,
				auth: json.auth == false ? false : true
			})
		}catch(err){
			this.setState({ loading: false, error: err })
		}
	}

	// handle onChange for inputs
	handleChange = (ev) => {
		const name = ev.target.name;
		const value = ev.target.value;
		this.setState({
			[name]: value
		})
	}

	saveConfig = async () => {
		this.setState({ loading: true, error: null })
		try{
			console.log('antes de actualizar')
			let response = await fetch('/api/admin/update/codes', {
				method: 'PUT',
				body: JSON.stringify({
					...this.state
				}),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem("token")
                }
			})
			console.log('aqui pasó')
			let text = await response.text()
			console.log(text);
			// reload the page
			// this.props.history.push('/admin/config-codigos');
			this.setState({ loading: false, error: null })
		}catch(err){
			this.setState({ loading: false, error: err })
		}
	}


	render(){
		let { loading, error, auth } = this.state;
		
		if(loading) return <Loader />;
		
		if(error) return <h1>the ERROR is: {error}</h1>

		if(!auth) return <h1 className="title">no estas autorizado</h1>

		return(
			<div className="AdminCodes-container">
				
				<ConfigValuesCodes {...this.state} handleChange={this.handleChange} saveConfig={this.saveConfig}/>
				
			</div>
		)
	}
}

export default AdminCodes;