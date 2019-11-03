import React from 'react';
// style
import '../styles/configValuesCodes.css';

function ConfigValuesCodes({saveConfig,handleChange, divisorPremio, duracionEnDiasDeCodigoHora, duracionEnDiasDeCodigoPremio, cantidadDeCodigosAGenerar, eleccionPremio}){
	return(
		<div className="configValuesCodes-container">
			<h1 className="title has-text-centered">configuración de códigos</h1>
			
			<form className="inputs-configCodes-container columns is-centered">
				<div className="column is-half">
					<div className="form">
						<div className="field">
							{/* cantidad de códigos */}
							<p className="label-config">cantidad de códigos a generar</p>
							<div className="control">
								<select onChange={handleChange} className="select" name="cantidadDeCodigosAGenerar" value={cantidadDeCodigosAGenerar}>
									<option value="20">20</option>
									<option value="30">30</option>
									<option value="50">50</option>
									<option value="70">70</option>
									<option value="100">100</option>
								</select>
							</div>
						</div>
						<div className="field">
							{/* duración de codigos hora */}
							<p className="label-config">duración (en días) de codigos de HORA</p>
							<div className="control">
								<input type="number" onChange={handleChange} className="input" 
								defaultValue={duracionEnDiasDeCodigoHora} placeholder="duración" name="duracionEnDiasDeCodigoHora"
								/>
							</div>
						</div>
						<div className="field">
							{/* duración de códigos premio */}
							<p className="label-config">duración (en días) de codigos de PREMIO</p>
							<div className="control">
								<input type="number" onChange={handleChange} className="input" 
								defaultValue={duracionEnDiasDeCodigoPremio} placeholder="duración" name="duracionEnDiasDeCodigoPremio"
								/>
							</div>
						</div>
						<div className="field">
							{/* divisor premio = codigos hora necesarios para obtener 1 codigo premio */}
							<p className="label-config">cantidad de códigos HORA necesarios para un(1) PREMIO</p>
							<div className="control">
								<input type="number" onChange={handleChange} className="input" 
								defaultValue={divisorPremio} placeholder="cantidad necesaria" name="divisorPremio"
								/>
							</div>
						</div>

						<div className="field">
							{/* premio será 1 hora ó media hora */}
							<p className="label-config">Elegir premio</p>
							<div className="control">
								<select onChange={handleChange} className="select" name="eleccionPremio" value={eleccionPremio}>
									<option value="una">una(1) hora gratis</option>
									<option value="media">media hora(30min) gratis</option>
								</select>
							</div>
						</div>


						<button onClick={saveConfig} className="button is-medium is-success">guardar configuración</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default ConfigValuesCodes