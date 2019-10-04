import React from 'react';
// style
import '../styles/showCodes.css';

const ShowCodes = ({arrCodes, type}) => (
	<div className="showCodes-container">
		<table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>código</th>
					<th>tipo</th>
					<th>creación</th>
					<th>expiración</th>
					{ type == "prize" && <th>user</th> } 
				</tr>
			</thead>
			<tbody>
				{
					arrCodes.length 
					?	 
						arrCodes.map( (codeObj, index) => {
							let { code, created, expiration, type, user }  = codeObj;
							return(
								<tr key={code} className={index % 2 == 0 ? '' : 'has-background-light' }>
									<td>{index + 1}</td>
									<td>{code}</td>
									<td>{type}</td>
									<td>{ created.join('/') }</td>
									<td>{ expiration.join('/') }</td>
									{  user!='' && <td>{user}</td>  }
								</tr>
							)
						}) 
					:
					<tr>
						<td>no hay codigos de este tipo aún</td>
					</tr>
				}
			</tbody>
		</table>
	</div>
);

export default ShowCodes;