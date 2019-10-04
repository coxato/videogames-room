import React from 'react';

function LoginForm({handleChange, login}) {
	return(
		<div className="columns is-centered">
			<div className="column is-half">
				<div className="card">
					<div className="title has-text-centered">iniciar sesión</div>
					<div className="card-content">
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
						
						<button onClick={login} className="button is-fullwidth is-link">login</button>

					</div>
				</div>
			</div>
		</div>
	)
}

export default LoginForm;