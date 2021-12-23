import React from 'react';
import { apiHost } from '../../config/config';
// Styles
import './styles/contacto.css';

function Contact() {
	return(
		<div className="columns is-centered ">
			<div className="column is-half contenido-contact">
				<h1 className="has-text-centered title">¿Quieres contactarnos?</h1>
				<p className="content contact-description">
					Si tienes alguna duda en particular o quieres contactarte
					directamente con nosotros para organizar una actividad, no dudes 
					en comunicarte con nosotros.    
				</p>
				<p className="content contact-description">Comunicate como más te guste:</p>
				<div className="contacto-basico">
					<p className="negro"><b>Telefono:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src={apiHost+"/static/images/cellphone.svg"} alt="telefono masplay"/> </div>
						<p>(0235)3417745</p>
					</div>

					<p className="negro"><b>Correo:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src={apiHost+"/static/images/email.svg"} alt="correo masplay"/> </div>
						<p>masplayvideojuegos@gmail.com</p>
					</div>

					<p className="negro"><b>facebook:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src={apiHost+"/static/images/facebook-logo.svg"} alt="correo masplay"/> </div>
						<p>dejanos un mensaje en nuestra &nbsp;</p> <br/> <a className="footer-link" rel="noopener noreferrer" href="https://www.facebook.com/masplay.videojuegos/" target="_blank">página de facebook</a>
					</div>

				</div>
			</div>
		</div>
	)
}	

export default Contact;
