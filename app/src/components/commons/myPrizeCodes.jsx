import React from 'react';

function MyPrizeCodes({arrCodes}) {
	return(
		<div className="myCodes-container">
			<table className="table">
				<thead className="has-background-grey">
					<tr>
						<td>#</td>
						<td>Código</td>
						<td>Creación</td>
						<td>Expiración</td>
					</tr>
				</thead>
				<tbody>
					{ 	arrCodes.length>0
						?
						arrCodes.map( (codeObj, idx) => {
							let { code, created, expiration }  = codeObj;
							return(
								<tr key={code} className={idx % 2 != 0 ? 'has-background-light': ''}>
									<td>{idx+1}</td>
									<td>{code}</td>
									<td>{created.join('/')}</td>
									<td>{expiration.join('/')}</td>
								</tr>
							)
						})
						:
						<tr>
							<td>No tienes códigos de tipo premio aún</td>
						</tr>
					}
				</tbody>
			</table>
		</div>
	)
}

export default MyPrizeCodes;