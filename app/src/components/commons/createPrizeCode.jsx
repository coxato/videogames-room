import React, { useState, useEffect } from 'react';
// utils
import checkCode from '../../../utilities/checkCode';
// styles
import './styles/checkPrizeCodes.css';




function CheckPrizeCodes({ horasNecesarias, horasUser }){

	let [ codeState, setCodeState ] = useState({
		code: {},
		verifying: false,
		success: false,
		fail: false,
	})

	// check the prize code
	const checkCodePrize = async (type) => {
		setCodeState({ ...codeState, verifying: true });
		try{
			// just check for make a code
			let checked = await checkCode(type);
			console.log("que es checked en el frontend ", checked)
			setCodeState({ verifying: false, ...checked })
		}catch(err){
			console.log(err);
		}
	}

	// componentDidMount hook useEffect, to check if user can create a prize code
	useEffect(() => {
		async function check(){
			checkCodePrize('prize');
		}
		check();
	}, []);

	let { code, verifying, success, fail } = codeState;

	return(
		<div className="checkHourCodes-container">

			{ verifying && <div className="comprobando">Comprobando código</div> }


			{/* success or fail messages */}
			{
				success
				&&
				<div className="successComprobation c-message">
					<p>Que bien!, has ganado un código PREMIO</p>
					<h1 className="title">{code.code}</h1>
					<p>Anótalo y muéstralo en masplay para ganar 1 hora gratis</p>
					<p className="has-color-success">Además te acabas de sumar 300 puntos! :)</p>
					<p className="reloadMessage">Recarga la página para ver los cambios reflejados</p>
				</div>
			}

			{
				fail
				&&
				<div className="failedComprobation c-message">
					<h1 className="subtitle">Con {horasNecesarias} horas acumuladas te ganas un premio</h1>
					<p className="content">Lo siento, pero te faltan {horasNecesarias - horasUser} horas <br/>
						ingresa más códigos de tipo hora para ganarte un premio
					</p>
				</div>
			}

		</div>
	)
}

export default CheckPrizeCodes;