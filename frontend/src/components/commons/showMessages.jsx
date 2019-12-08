import React from 'react';
import { apiHost } from '../../config/config';
// style
// import './styles/showMessages.css';

const ShowMessages = ({messages, admin = false}) => (
	messages.map( messageObj => {
		let { username, foto, message, isAdmin,  hour, date } = messageObj;
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
					{ isAdmin && <p className="isAdmin-title">Administrador</p>}
					<div className="nombre title">{username || 'Anónimo'}</div>
					<div className="message-text">{message}</div>
				</div>
				{ admin && <button onClick={()=>alert('borrar mensaje')} className="button is-danger">borrar mensaje</button> }
			</div>
		)
	})

);

export default ShowMessages;