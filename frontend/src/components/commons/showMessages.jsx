import React from 'react';
import { apiHost } from '../../config/config';
// style
// import './styles/showMessages.css';

const ShowMessages = ({  messages, admin = false, onDelete = ()=>{}  }) => (
	messages.map( messageObj => {
		let { _id, username, foto, message, isAdmin,  hour, date } = messageObj;
		return(
			<div className="messages-container" key={Math.random() * 1000}>
				{/* photo and date */}
				<div className="message-izquierda">
					<div className="imagen">
						<img src={foto || apiHost+'/static/images/anon-user.jpg'} alt="masplay comment"/>
					</div>
					<div className="fechas">
						<p>{date}</p>
						<p>{hour}</p>
					</div>
				</div>
				{/* name and message */}
				<div className="message-derecha">
					{ // delete message
						admin 
						&& 
						<button className="button is-danger" onClick={ () => onDelete(_id)}>borrar mensaje</button>
					}
					{ isAdmin && <p className="isAdmin-title">Administrador</p>}
					<div className="nombre title">{username || 'Anónimo'}</div>
					<div className="message-text">{message}</div>
				</div>
			</div>
		)
	})

);

export default ShowMessages;