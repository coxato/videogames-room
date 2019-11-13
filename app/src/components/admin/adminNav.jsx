import React from 'react';
import { NavLink } from 'react-router-dom';
import './styles/adminNav.css';

function AdminNav() {
	return(
		<div className="nav admin-nav-container">
			<div className="links-container">

				<div className="buttons">
					<a href="/" className="button my-profile">
						Home
					</a>
					<button className="button logout is-warning" onClick={() => {
						sessionStorage.setItem("token","");
						location.href = "/";
					}}>
						cerrar sesión
					</button>
			    </div>

				<NavLink to="/admin/general" className="admin-nav-link" activeClassName="is-admin-nav-active">
					información general
				</NavLink>

				<NavLink to="/admin/eventos" className="admin-nav-link" activeClassName="is-admin-nav-active">
					administrar eventos
				</NavLink>

				<NavLink to="/admin/noticias" className="admin-nav-link" activeClassName="is-admin-nav-active">
					administrar noticias
				</NavLink>

				<NavLink to="/admin/config-codigos" className="admin-nav-link" activeClassName="is-admin-nav-active">
					configuración de códigos
				</NavLink>
 
				<NavLink to="/admin/crear-codigos" className="admin-nav-link" activeClassName="is-admin-nav-active">
					creación e información de códigos
				</NavLink>

				<NavLink to="/admin/comprobar-codigo" className="admin-nav-link" activeClassName="is-admin-nav-active">
					comprobación de códigos premio
				</NavLink>


			</div>

		</div>
	)
}

export default AdminNav;