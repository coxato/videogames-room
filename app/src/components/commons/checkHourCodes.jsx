import React, { useState } from 'react';
// utils
import checkCode from '../../../utilities/checkCode';
// styles
import './styles/checkHourCodes.css';




function CheckHourCodes({horasNecesarias}){

	let [ codeState, setCodeState ] = useState({
		code: '',
		verifying: false,
		success: false,
		fail: false,
		used: false,
		expired: false,
		expirationDay: ''
	})

	// check the hour code
	const checkCodeHour = async (type, code) => {
		setCodeState({ ...codeState, verifying: true });
		try{
			let checked = await checkCode(type, code);
			console.log("que es checked en el frontend ", checked)
			setCodeState({ verifying: false, code, ...checked })
		}catch(err){
			console.log(err);
		}
	}

	// save the code in state
	const handleChange = (ev) => {
		let key = ev.target.name, value = ev.target.value;
		setCodeState({
			...codeState,
			[key]: value
		})
	}

	let { code, verifying, success, fail, used, expired, expirationDay } = codeState;

	return(
		<div className="checkHourCodes-container">
			<h1 className="title">Ingresa el código de hora para comprobarlo</h1>

			<div className="field">
				<div className="control">
					<input type="text" className="input codeInput" name="code" onChange={handleChange} placeholder="introduce aqui el código"/>
				</div>
			</div>

			{ verifying && <div className="comprobando">Comprobando código</div> }

			<button className="button is-link is-large" onClick={() => checkCodeHour('hour', code ) }>Comprobar</button>

			<span className="recordatory">
				Recuerda que cada {horasNecesarias} horas acumuladas en tu contador de horas, puedes canjearlas por un premio
			</span>

			{/* success or fail messages */}
			{
				success
				&&
				<div className="successComprobation c-message">
					<p>Genial!, tu código es valido y le sumas horas a tu contador de horas</p>
					<p className="has-color-success">además te acabas de sumar 100 puntos :)</p>
					<p className="reloadMessage">recarga la página para ver los cambios reflejados</p>
				</div>
			}

			{
				expired
				&&
				<div className="failedComprobation c-message">
					<p>CODIGO EXPIRADO</p>
					<p className="has-color-danger">el código se expiro el día {expirationDay.split('/').reverse().join('/') }</p>
				</div>
			}

			{
				fail
				&&
				<div className="failedComprobation c-message">
					<p>Lo siento, pero este código no es valido, intenta de nuevo</p>
				</div>
			}

			{
				used
				&&
				<div className="usedCode c-message">
					<p>mmmmm, parece que este código ya ha sido usado</p>
				</div>
			}

		</div>
	)
}

export default CheckHourCodes;