import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// components
import Loader from '../components/commons/loader';
import Noticia from '../components/commons/noticia';

import NoticiasTest from '../components/commons/noticiasTest';

// styles
import './styles/news.css';


class News extends Component{

	state = {
		loading: true,
		noticias: [],
		isAdmin: false
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData = async () => {
		this.setState({ loading: true });

		let response = await fetch("/api/noticias/all", {
			headers: {
				'x-access-token': sessionStorage.getItem("token")
			}
		});
		let noticiasJson = await response.json();
		console.log(noticiasJson)
		this.setState({
			loading: false,
			noticias: noticiasJson.noticias,
			isAdmin: noticiasJson.isAdmin
		})
	}

	onDelete = async (id) => {
		let response = await fetch(`/api/noticias/delete/${id}`, {
			method: 'DELETE',
			headers: {
				'x-access-token': sessionStorage.getItem("token")
			}
		});
		let text = await response.text();
		console.log(text);
		this.fetchData();
	}

	render(){
		let { loading, noticias, isAdmin } = this.state;
		const onDelete = this.onDelete;

		if(loading) return <Loader />

		return(
			<div className="noticias-super-container">
			{
				isAdmin &&
				<div className="crearnoticia-button">
					<a href="/admin/noticia/" className="button is-large is-link">Crear noticia</a>
				</div>
			}
			{/*
				{
					noticias.length > 0
					?
					// noticias
					noticias.map( noticia => <div className="noticias-cont" key={Math.random()}>
												<Noticia 
													{...noticia}
													onDelete={onDelete}
													isAdmin={isAdmin} 
												 /> 
											</div>
					)
					:
					<h1 className="title">Aún no hay noticias</h1>
				}
			*/}

		{	noticias.length > 0 ? <NoticiasTest 
									noticiasArr={noticias}
									deleteNews={onDelete}
									isAdmin={isAdmin}
								/> : <h1>no hay noticias</h1> }
			</div>
		)
	}

}

export default News;