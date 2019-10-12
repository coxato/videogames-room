import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import './styles/nav.css';

function Nav({isLoged=null, id=null}) {
	return(
		<nav className="nav-menu">
			<div className="logoImg">
				<Link to="/">
	  				<img src="/static/images/logo2.png" />
				</Link>
			</div>

    		<div className="nav-menu-flex">
    			<div className="nav-items">
	      			<NavLink to="/juegos" className="nav-item" activeClassName="nav-is-active">
	        			juegos
	      			</NavLink>

			      	<NavLink to="/eventos" className="nav-item" activeClassName="nav-is-active">
			        	eventos
			      	</NavLink>

			      	<NavLink to="/contacto" className="nav-item" activeClassName="nav-is-active">
			        	contacto
			      	</NavLink>
    			</div>
		    
		    <div className="nav-end">
			    <div className="navbar-item">
					{
						isLoged
						?
					    <div className="buttons">
							<Link to={`/profile/${id}`} className="button my-profile">
								mi perfil
							</Link>
							<Link to="/logout" className="button logout is-warning">
								cerrar sesión
							</Link>
					    </div>
					    :
						<div className="buttons">
							<Link to="/register" className="button register">
								registrarse
							</Link>
							<Link to="/login" className="button login">
								iniciar sesión
							</Link>
					    </div>
					}
			    </div>
		    </div>
		    </div>


    	</nav>


	)
}

export default Nav;