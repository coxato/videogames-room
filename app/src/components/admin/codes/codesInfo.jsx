import React from 'react';
// components
import ShowCodes from './showCodes';
// style
import '../styles/codesInfo.css';

function CodesInfo({ hourCodes, prizeCodes }){
	return(
		<div className="codesInfo-container">
			<h1 className="title has-text-centered">información acerca de los códigos</h1>

			<div className="tables-info-container">
				<div className="show-hours">
					<p className="subtitle">códigos de tipo HORA disponibles: {hourCodes.length}</p>
					<ShowCodes arrCodes={hourCodes} type="hour" />
				</div>
				<div className="show-prizes">
					<p className="subtitle">códigos de tipo PREMIO disponibles: {prizeCodes.length}</p>
					<ShowCodes arrCodes={prizeCodes} type="prize" />
				</div>
			</div>


		</div>
	)
}

export default CodesInfo;