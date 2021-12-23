import React from 'react';
// style
import '../styles/showCodes.css';
 

const ShowCodes = ({ arrCodes, type, updateCodes }) => (
	<div className="showCodes-container" id={`table-container-${type}`}>
		<table className="table">
			<thead>
				<tr>
					<th>#</th>
					<th>código</th>
					<th>tipo</th>
					<th>creación</th>
					<th>Válido hasta</th>
					{ type === "prize" && <th>user</th> }
					<th>usado</th>
					<th>válido</th>
					{ type === "hour" && <th>entregado</th> } 
				</tr>
			</thead>
			<tbody>
				{
					arrCodes.length 
					?	 
						arrCodes.map( (codeObj, index) => {
							let { code, created, expiration, type, user, isUsed, isGiven, isValid }  = codeObj;
							return(

								<tr key={code} 
									className={ (() => {
										// change the classname depends if is odd or not, and if the code is used or not
										if(index % 2 === 0){
											return !isValid ? 'is-odd is-not-valid' : 'is-odd'
										}else{
											return !isValid ? 'is-not-valid' : ''
										} 
									})()// IIFE function to can return, jsx does not show it if it returns nothing
								}>
									<td>{index + 1}</td>
									<td>{code}</td>
									<td>{type}</td>
									{/* only show creation and expiration time in prize codes */}
									<td>{ created.join('/') }</td> 
									<td>{ expiration.join('/') }</td>
									{  user!=='' && <td>{user}</td>  }
									{/* the code is used or not */}
									{ 
										// show a checkbox if is prize code, or show yes/no if is hour code 
										(() => {
											if(type==="prize"){
												return <td><input type="checkbox" onChange={ ({target}) => updateCodes(type, code, target.checked) } defaultChecked={ isUsed } /></td>
											}else{
												return isUsed ? <td>si</td> : <td>no</td>
											} 
										})()// IIFE function to can return, jsx does not show it if it returns nothing	
									}
									{
										<td>{isValid ? 'si' : 'no'}</td>
									}

									{/* the code is given or not, only show a checkbox in hour codes */}
									{ type==="hora"  && <td><input type="checkbox" onChange={ ({target}) => updateCodes(type, code, target.checked) } defaultChecked={ isGiven } /></td> }
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