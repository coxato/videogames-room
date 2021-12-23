import React from 'react';
import './styles/about.css';

function About() {
	return(
		<div className="about-wrapper">
			<section className="about-container">
				<h1 className="title has-text-centered">Acerca de</h1>
				<p className="about-contenido">
					Éste sitio web forma parte del proyecto socio tecnológico
					de los estudiantes del Programa Nacional de Formación en Informática
					(PNFI), sección 2, del Instituto Universitario de Tecnología de los Llanos
					(IUTLL) sede Valle de la Pascua - Guárico.
				</p>

					<p className="subtitle has-text-centered">Integrantes del proyecto:</p>
					<table className="table">
						<thead className="has-background-light">
							<tr>
								<td>Nombre y apellido</td>
								<td>Cédula de identidad</td>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Carlos Martínez</td>
								<td>26.717.488</td>
							</tr>
							<tr>
								<td>Eduardo Mattey</td>
								<td>28.169.054</td>
							</tr>
						</tbody>
					</table>
			</section>
		</div>
	)
}

export default About;