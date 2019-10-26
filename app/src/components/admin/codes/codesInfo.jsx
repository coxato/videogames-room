import React from 'react';
// components
import ShowCodes from './showCodes';
// style
import '../styles/codesInfo.css';

// function to get number of valid codes
function countValidCodes(arrCodes) {
	return arrCodes.filter( code => code.isValid ).length;
}

function CodesInfo({ hourCodes, prizeCodes, updateCodeCheckboxHandler }){
	return(
		<div className="codesInfo-container">
			<h1 className="title has-text-centered">información acerca de los códigos</h1>

			<div className="tables-info-container">
				<div className="show-hours">
					<p className="subtitle">códigos de tipo HORA disponibles: {countValidCodes(hourCodes)} </p>
					<ShowCodes arrCodes={hourCodes} type="hour" updateCodes={updateCodeCheckboxHandler} />
				</div>
				<div className="show-prizes">
					<p className="subtitle">códigos de tipo PREMIO disponibles: {countValidCodes(prizeCodes)} </p>
					<ShowCodes arrCodes={prizeCodes} type="prize" updateCodes={updateCodeCheckboxHandler} />
				</div>
			</div>


		</div>
	)
}

export default CodesInfo;