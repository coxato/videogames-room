import React from 'react';
// styles
import './styles/checkHourCodes.css';
import './styles/checkPrizeCodes.css';


function CheckPrizeCodes({success, fail, used, verifying, code, checkCodePrize, handleChange }){

	return(
		<div className="CheckPrizeCodes-container">
			<h1 className="title">Comprobar código de premio</h1>

			<div className="field">
				<div className="control">
					<input type="text" className="input codeInput" name="code" onChange={handleChange} placeholder="introduce aqui el código"/>
				</div>
			</div>

			{ verifying && <div className="comprobando">Comprobando código</div> }

			<button className="button is-link is-large is-fullwidth" onClick={() => checkCodePrize('prize', code ) }>Comprobar</button>

			{/* success or fail messages */}
			{
				success
				&&
				<div className="successComprobation c-message">
					<p>código valido</p>
				</div>
			}

			{
				fail
				&&
				<div className="failedComprobation c-message">
					<p>Error, código no valido, intente de nuevo</p>
				</div>
			}

			{
				used
				&&
				<div className="usedCode c-message">
					<p>este código ya ha sido usado</p>
				</div>
			}

		</div>
	)
}

export default CheckPrizeCodes;