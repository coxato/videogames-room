import React from 'react';
import { Link } from 'react-router-dom';
// styles
import './styles/noticia.css';

function Noticia({ _id, titulo, descripcion, fecha, isAdmin = false, onDelete }) {
	return(
		<div className="noticia-container">
			{ 
				isAdmin &&
				<div className="isAdmin-noticia">
					<Link to={`/admin/noticia/${_id}`} className="button is-warning">editar</Link>
					<button onClick={() => onDelete(_id)} className="button is-danger">borrar</button>
				</div>
			}
			<div className="arriba-noticia">
				<div>
					<h1 className="title">{titulo}</h1>
				</div>
				<div className="fecha-noticia">fecha: {fecha}</div>
			</div>
			<div className="contenido-noticia">
				<p>{descripcion}</p>
			</div>
		</div>
	)
}

export default Noticia;