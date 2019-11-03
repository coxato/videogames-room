import React from 'react';
// Styles
import './styles/contacto.css';

function Contact() {
	return(
		<div className="columns is-centered ">
			<div className="column is-half contenido-contact">
				<h1 className="has-text-centered title">Quieres contactarnos?</h1>
				<p className="content contact-description">
					Si tienes alguna duda en particular o quieres contactarte
					directamente con nosotros para organizar una actividad no dudes 
					en comunicarte con nosotros.    
				</p>
				<p className="content contact-description">Comunicate como más te guste:</p>
				<div className="contacto-basico">
					<p className="negro"><b>Telefono:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src="/static/images/cellphone.svg" alt="telefono masplay"/> </div>
						<p>(0235)3417745</p>
					</div>

					<p className="negro"><b>Correo:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src="/static/images/email.svg" alt="correo masplay"/> </div>
						<p>masplayvideojuegos@gmail.com</p>
					</div>

					<p className="negro"><b>facebook:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src="/static/images/facebook-logo.svg" alt="correo masplay"/> </div>
						<p>dejanos un mensaje en nuestra</p> <br/> <a className="footer-link" href="https://www.facebook.com/masplay.videojuegos/" target="_blank">página de facebook</a>
					</div>

					<p className="negro"><b>whatsapp:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src="/static/images/whatsapp.svg" alt="correo masplay"/> </div>
						<p>(+58)416-1234567</p>
					</div>
				</div>
			</div>
		</div>
	)
}	

export default Contact;
