import React, {Component} from 'react';
// components
import NoticiaForm from '../components/commons/noticiaForm';
import Loader from '../components/commons/loader';
// utils
import uploadPhoto from '../utilities/uploadPhoto';


class EditAndCreateNews extends Component{

	state = {
		loading: true,
		titulo: '',
		descripcion: '',
		imagen: '',
		archivo: null
	}

	handleChange = (ev) => {
		let key = ev.target.name, value = ev.target.value;
		this.setState({
			[key]: value
		});
	}
	// handle onChange for input type=file 
	handleChangeInputFile = ev => {
		this.setState({archivo: ev.target.files[0]})
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
			let { titulo, descripcion, imagen } = noticia;
			this.setState({ loading: false, titulo, descripcion, imagen }) 
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
		// state variables
		let {titulo, descripcion, imagen, archivo} = this.state; 
		// si quiere guardar archivo
		if(archivo){
			let uploaded = await uploadPhoto(archivo, 'fotoSubir', '/api/admin/upload');
			// photo saved
			if(uploaded.ok) imagen = '/static/images/'+uploaded.filename;
			// photo not saved
			else imagen = '/static/images/default-news.jpg'; 
		}else{
			// default image
			imagen = '/static/images/default-news.jpg';
		}

		// news object to save in MongoDB
		const noticia = {
			titulo,
			descripcion,
			imagen,
			fecha: `${day}/${month}/${year}`,
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
		let { loading, titulo, descripcion, imagen } = this.state;
		
		if(loading) return <Loader/>

		return <NoticiaForm 
					titulo={titulo}
					imagen={imagen}
					descripcion={descripcion}
					handleChange={this.handleChange}
					handleSave={this.handleSave}
					handleChangeInputFile={this.handleChangeInputFile}
				/>
	}
}
 
export default EditAndCreateNews;