import React, { Component } from 'react';
import { apiHost } from '../../config/config';

// components
import Loader from '../../components/commons/loader';
import CodesInfo from '../../components/admin/codes/codesInfo';
import SessionPlease from '../../components/users/sessionPlease';
// style
import './styles/createCodes.css';

class CreateCodes extends Component{

	state = {
		loading: true,
		error: null,
		hourCodes: [],
		prizeCodes: [],
		auth: false
	}

	// call the api with this.fetchData method
	componentDidMount(){
		this.fetchData();
	}

	// fetch the codes
	async fetchData(){
		this.setState({ loading: true, error: null })
		try{
			let response = await fetch(`${apiHost}/api/admin/data/check-and-get-codes`, {
				headers: {
					'x-access-token': sessionStorage.getItem("token")
				}
			});
			let json = await response.json();
			let { hourCodes, prizeCodes } = json;
			this.setState({
				hourCodes,
				prizeCodes,
				loading: false,
				auth: json.auth === false ? false : true
			})
		}catch(err){
			this.setState({ loading: false, error: err })
		}
	}
 

	// handle method to create codes
	handleCreateCodes = async (codeType) => {
		this.setState({ loading: true , error: null });
		try{
			// create codes with API
			let response = await fetch(`${apiHost}/api/admin/create/code/hora`, {
				headers: {
					'x-access-token': sessionStorage.getItem('token')
				}
			});
			let created = await response.text();
			console.log(created);
			this.fetchData();
		}catch(err){
			this.setState({ loading: false, error: err });
		} 
	}

	// handle method to deleted invalid codes, used codes are invalid codes
	handleDeleteCodes = async () => {
		this.setState({ loading: true , error: null });
		try{
			// update the code
			let response = await fetch(`${apiHost}/api/admin/delete/code/`, {
				method: 'DELETE',
				headers: {
					'x-access-token': sessionStorage.getItem('token')
				}
			});
			let updated = await response.text();
			console.log(updated);
			this.fetchData();
		}catch(err){
			this.setState({ loading: false, error: err });
		}
	}

	// handle method to update the isUsed or isGiven code value, by a checkbox
	updateCodeCheckboxHandler = async (type, code, boolean) => {
		this.setState({ loading: true , error: null });
		try{
			// update the code
			let response = await fetch(`${apiHost}/api/admin/update/code/?type=${type}&code=${code}&boolean=${boolean}`, {
				method: 'PUT',
				headers: {
					'x-access-token': sessionStorage.getItem('token')
				}
			});
			let updated = await response.text();
			console.log(updated);
			this.fetchData();
		}catch(err){
			this.setState({ loading: false, error: err });
		} 

	}

	handlePrint = () => {
		let divContents = document.getElementById('table-container-hour').innerHTML;
		let printWindow = window.open('', '', 'height=400,width=800');
		printWindow.document.write('<html><head><title>Codigos hora</title>');
		printWindow.document.write('</head><body >');
		printWindow.document.write(divContents);
		printWindow.document.write('</body></html>');
		printWindow.document.close();
		printWindow.print();
		printWindow.close();
	}

 
	render(){
		let { loading, error, auth } = this.state;
		
		if(loading) return <Loader />;
		
		if(error) return <h1>the ERROR is: {error}</h1>;

		if(!auth) return <SessionPlease state={{ redirectTo: '/admin/crear-codigos' }} />

		return(
			<div className="AdminCodes-container">
				<div className="buttons">
					<button className="button is-large is-success" onClick={this.handleCreateCodes}>Crear nuevos códigos</button>
					<button className="button is-large is-danger" onClick={this.handleDeleteCodes}>Borrar códigos NO válidos</button>
					<button className="button is-large is-primary" onClick={this.handlePrint}>Imprimir códigos</button>
				</div>
				<CodesInfo {...this.state} updateCodeCheckboxHandler={this.updateCodeCheckboxHandler}/>

			</div>
		)
	}
}

export default CreateCodes;