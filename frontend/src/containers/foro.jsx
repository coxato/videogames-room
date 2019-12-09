import React, { Component } from 'react';
import { apiHost } from '../config/config';
// components
import Loader from '../components/commons/loader';
import ShowMessages from '../components/commons/showMessages';
// style
import './styles/foro.css';

class Foro extends Component{

	state = {
		loading: true,
		error: null,
		messages: [],
		isAdmin: false
	}

	fetchData = async () => {
		this.setState({ loading: true, error: null });
		try{
			let response = await fetch(`${apiHost}/api/foro/messages`, {
				headers: {
					'x-access-token': sessionStorage.getItem("token")
				}
			});
			let {messages, isAdmin} = await response.json();
			this.setState({messages, isAdmin, loading: false});
		}catch(err){
			console.log(err);
			this.setState({error: err, loading: false});
		}
	}

	saveMessage = async () => {
		this.setState({loading: true});
		const date = new Date();
		let today = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
		let hour = `${date.getHours()}:${date.getMinutes()}`;
		let message = document.getElementById('foroinput').value;
		try{

			let response = await fetch(`${apiHost}/api/foro/save`, {
				method: 'POST',
				body: JSON.stringify({
					message,
					hour,
					date: today 
				}),
				headers: {
					'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem("token")
				}
			});
			let textResponse = await response.text();
			console.log(textResponse);
			// show the created message
			this.fetchData();
		}catch(err){
			console.log(err);
			this.setState({loading: false, error: err});
		}
	}

	// delete messages method
	onDelete = async (_id) => {
		this.setState({loading: true});
		try {
			let response = await fetch(`${apiHost}/api/foro/delete/${_id}`, {
				method: 'DELETE'
			});
			let textResponse = await response.text();
			console.log(textResponse);
			// reload the messages
			this.fetchData();		
		} catch (err) {
			console.log(err);
			this.setState({loading: false, error: err});
		}
	}


	componentDidMount(){
		this.fetchData();
	}


	render(){
		let { loading , error, messages, isAdmin} = this.state;
		if(loading) return <Loader />
		
		// the user is not admin
		if(!isAdmin){
			return ( 
				<div className="foro-container">
					<div className="input-foro-container has-text-centered">
						<h1 className="title">Éste es el foro de MasPlay</h1>
						<h2 className="subtitle">Deja un comentario o pregunta lo que quieras</h2>
						<textarea id="foroinput" cols="20" rows="7" className="textarea input" 
							placeholder="escribe acerca de masplay, o bien, has una pregunta">
						</textarea>
						<button onClick={this.saveMessage} className="is-link button">comentar</button>
					</div>
					{
						messages.length > 0
						?
						<ShowMessages messages={messages} />
						:
						<h1 className="title notMessages">lo siento, aún no hay mensajes aqui, sé el primero en dejar uno!</h1>
					}
				</div>
			)
		} 
		// user is admin
		return <ShowMessages admin={isAdmin} onDelete={this.onDelete} messages={messages}/>
	}
}

export default Foro;