import React from 'react';
import { Link } from 'react-router-dom';
// styles
import './styles/footer.css';

function Footer() {
	return(
		<footer className="footer-container">
			<div className="footer-arriba">
				<div className="image-and-direction">
					<img src="/static/images/logo2.png" alt="logo masplay"/>
					<div className="direccion">
						<p><b>Dirección</b></p>
						<p className="content">
							calle Retumbo entre <br/> 
							Av. Rómulo Gallegos y calle Paraíso <br/>
							Valle de la Pascua - Guárico <br/>
							Centro Comercial Norte - 2do piso
						</p>
					</div>
				</div>

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
				</div>

				<div className="contacto-redes">
					<p className="negro"><b>facebook:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src="/static/images/facebook-logo.svg" alt="telefono masplay"/> </div>
						<p>
							<a className="footer-link" href="https://www.facebook.com/masplay.videojuegos/" target="_blank">danos un me gusta</a>
						</p>
					</div>

					<p className="negro"><b>Instagram:</b></p>
					<div className="contacto">
						<div className="imagen-contacto"> <img src="/static/images/instagram-logo.svg" alt="correo masplay"/> </div>
						<a href="https://www.instagram.com/masplayvideojuegos/?hl=es-la" target="_blank">&nbsp; @masplayvideojuegos</a>
					</div>
					
					<Link className="negro content acerca-de" to="/about"><u><b>acerca de</b></u></Link>

				</div>
			</div>
			<div className="footer-abajo">
				<p>Hecho por <a className="footer-link" href="https://www.github.com/carlosedua" target="_blank">Carlos Martínez</a> </p>
			</div>
		</footer>
	)
}

export default Footer;