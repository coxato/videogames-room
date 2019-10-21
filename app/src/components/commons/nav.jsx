import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import './styles/nav.css';

function Nav() {

	let [hourPrice, setHourPrice] = useState('');

		{console.log("se ejecuto al principio de la función")}

	// like componentDidMount but with hooks
	useEffect(() => {
		async function fetchData(){
			try{
				let response = await fetch("/api/data/general");
				let data = await response.json();
				setHourPrice(data.precio)
			}catch(err){
				console.log('error whhile loading nav data ', err);
			}
		}

		{console.log("se ejecuto en el fetchData")}
		fetchData();
	}, []);

	return(
		<nav className="nav-menu">
		{console.log("se ejecuto en el render return")}
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
		    
		    {/* mostrar precio de la hora */}
			<div className="precio-nav">precio {hourPrice} Bs</div>
			
		    <div className="nav-end">


			    <div className="navbar-item">
					{
						sessionStorage.getItem("token")
						?
					    <div className="buttons">

							<Link to="/profile" className="button my-profile">
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