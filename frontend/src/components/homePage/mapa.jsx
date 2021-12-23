import React from 'react';
import './styles/mapa.css';

function Mapa() {
	return(
		<div className="mapa-component-container">
			<h1 className="title has-text-centered">Nuestra ubicación en el mapa</h1>
			<div className="mapa-container">
				<iframe title="map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3611.4655735366546!2d-66.0019738608128!3d9.214670793282517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8dd485289b579d1f%3A0x3907ffe3dc1afb11!2sCentro%20Comercial%20Norte!5e0!3m2!1ses-419!2sve!4v1573624399090!5m2!1ses-419!2sve" frameBorder="0" style={{border:0}} allowFullScreen=""></iframe>
			</div>
		</div>
	)
}

export default Mapa;