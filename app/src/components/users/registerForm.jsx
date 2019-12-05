import React from 'react';
import { Link } from 'react-router-dom';

function RegisterForm({handleChange, signup}) {
	return(
		<div className="columns is-centered">
			<div className="column is-half">
				<div className="card">
					<div className="title has-text-centered">registro de usuario</div>
					<div className="card-content">
						<div className="field">
							<label className="label">nombre</label>
							<div className="control">
								<input type="text" className="input" onChange={handleChange} name="nombre" />
							</div>
						</div>

						<div className="field">
							<label className="label">apellido</label>
							<div className="control">
								<input type="text" className="input" onChange={handleChange} name="apellido"/>
							</div>
						</div>

						{/*<div className="field">
							<label className="label">nombre de usuario</label>
							<div className="control">
								<input type="text" className="input" onChange={handleChange} name="username" placeholder="ejemplo: gamer123"/>
							</div>
						</div>*/}

						<div className="field">
							<label className="label">email</label>
							<div className="control">
								<input type="email" className="input" onChange={handleChange} name="email"/>
							</div>
						</div>

						<div className="field">
							<label className="label">contraseña</label>
							<div className="control">
								<input type="password" className="input" onChange={handleChange} name="password"/>
							</div>
						</div>

						<div className="field">
							<label className="label">repetir contraseña</label>
							<div className="control">
								<input type="password" className="input" onChange={handleChange} name="passwordConfirm"/>
							</div>
						</div>
						
						<button onClick={signup} className="button is-fullwidth is-link">registrarme</button>

					</div>

					<div className="content has-text-centered">
						¿ya tienes cuenta? <Link to="/login">iniciar sesión</Link>
					</div>
					
				</div>
			</div>
		</div>
	)
}

export default RegisterForm;