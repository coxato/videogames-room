import React, {Component} from 'react';
// components
import NoticiaForm from '../components/commons/noticiaForm';
import Loader from '../components/commons/loader';


class EditAndCreateNews extends Component{

	state = {
		loading: true,
		titulo: '',
		descripcion: ''
	}

	handleChange = (ev) => {
		let key = ev.target.name, value = ev.target.value;
		this.setState({
			[key]: value
		});
	}

	// fetch the data if the admin want edit news
	fetchData = async () => {
		const id = this.props.match.params.id;
		// if edit a news
		if(id){
			let response = await fetch(`/api/noticias/noticia/${id}`, {
				headers: {
					'x-access-token': sessionStorage.getItem("token")
				}
			});
			let noticia = await response.json();
			let { titulo, descripcion } = noticia;
			this.setState({ loading: false, titulo, descripcion }) 
		}else{
			this.setState({loading: false})
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	handleSave = async () => {
		const id = this.props.match.params.id;
		const date = new Date();
		let day = date.getDate(),
			month = date.getMonth() + 1,
			year = date.getFullYear();
		const noticia = {
			titulo: this.state.titulo,
			descripcion: this.state.descripcion,
			fecha: `${day}/${month}/${year}`
		}
		// check if admin wants edit or create a news checking the id
		let response;
		// edit
		if(id){
			response = await fetch(`/api/noticias/update/${id}`, {
				'method': 'PUT',
				'body': JSON.stringify(noticia),
				'headers': {
					'Accept': 'application/json',
		            'Content-Type': 'application/json',
		            'x-access-token': sessionStorage.getItem("token")
				}
			});
		}
		// create news
		else{
			response = await fetch("/api/noticias/crear", {
				'method': 'POST',
				'body': JSON.stringify(noticia),
				'headers': {
					'Accept': 'application/json',
		            'Content-Type': 'application/json',
		            'x-access-token': sessionStorage.getItem("token")
				}
			});
		}
		let createdOrUpdated = await response.text();
		console.log(createdOrUpdated);
		this.props.history.push("/admin/noticias");
	}

	render(){
		let { loading, titulo, descripcion } = this.state;
		
		if(loading) return <Loader/>

		return <NoticiaForm 
					titulo={titulo}
					descripcion={descripcion}
					handleChange={this.handleChange}
					handleSave={this.handleSave}
				/>
	}
}

export default EditAndCreateNews;