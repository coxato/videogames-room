import React, { Component } from 'react';
import { apiHost } from '../../config/config';
// components
import Search from '../../components/users/searchUsers';
import Loader from '../../components/commons/loader';

class SearchUsers extends Component{
	
	state = {
		toSearch: '',
		searchBy: 'nombre',
		loading: false,
		error: null,
		users: []
	}

	// search
	search = async () => {
		let {searchBy, toSearch} = this.state;
		this.setState({loading: true, error: null});

		try{
			let usersResponse = await fetch(`${apiHost}/api/users/getusers/?toSearch=${toSearch}&searchBy=${searchBy}`,{
				headers: {
					'x-access-token': sessionStorage.getItem('token')
				}
			});
			let jsonArray = await usersResponse.json();
			console.log(jsonArray)
			this.setState({
				users: jsonArray,
				loading: false
			})
		}catch(err){
			console.log(err);
			this.setState({loading: false, error: err});
		}


	}

	// add hour to user
	handleAddHour = async (_id) => {
		let response = await fetch(`${apiHost}/api/users/addhour/?id=${_id}`, {
			headers: {
				'x-access-token': sessionStorage.getItem('token')
			}
		});

		let text = await response.text();
		console.log(text);
	} 

	// handle onChange
	handleOnChange = ({ target }) => {
		let key = target.name, value = target.value;
		this.setState({
			[key]: value
		})
	}


	render(){
		let { loading } = this.state;
		return loading ? 
			<Loader />
			:
			<Search 
				handleOnChange={this.handleOnChange}
				users={this.state.users}
				search={this.search}
				handleAddHour={this.handleAddHour}
			/>
	}
}

export default SearchUsers;