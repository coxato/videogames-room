import React from 'react';
// components
import ShowCodes from './showCodes';
// style
import '../styles/codesInfo.css';

function CodesInfo({ hourCodes, prizeCodes }){
	return(
		<div className="codesInfo-container">
			<h1 className="title has-text-centered">información acerca de los códigos</h1>
			<div className="numbers-codesInfo">
				<p>códigos de tipo HORA disponibles: {hourCodes.length}</p>
				<p>códigos de tipo PREMIO disponibles: {prizeCodes.length}</p>
			</div>

			<div className="show-hours">
				<ShowCodes arrCodes={hourCodes}/>
			</div>

			<div className="show-prizes">
				<ShowCodes arrCodes={prizeCodes} type="prize" />
			</div>

		</div>
	)
}

export default CodesInfo;