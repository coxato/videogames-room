import React from 'react';
import Swal from 'sweetalert2';
// style
import './styles/searchUsers.css';



function SearchUsers({handleOnChange, search, users, handleAddHour}) {


	async function showAlert(_id, idUsuario, nombre) {
		Swal.fire({
	  title: '¿esta seguro?',
	  text: `¿Quiere añadir una hora a el usuario ${nombre} id: ${idUsuario}?`,
	  icon: 'warning',
	  showCancelButton: true,
	  confirmButtonColor: '#3085d6',
	  cancelButtonColor: '#d33',
	  confirmButtonText: 'Si, otorgar hora'
	}).then(async (result) => {
	  if (result.value) {
			let added = await handleAddHour(_id);
		

	    Swal.fire(
	      'hora sumada',
	      `al usuario con id ${idUsuario} se le agregó una hora`,
	      'success'
	    )
	  }
	})
	}


	return(
		<div className="search-user-container">
			<h1 className="title has-text-centered">Buscar Usuarios</h1>

			<div className="input-buscar-container">
				<input name="toSearch" onChange={handleOnChange} type="text" className="input" placeholder="escriba aqui su busqueda"/>
				<div className="search-select-container">
					<label className="label">Buscar por:</label>
					<select name="searchBy" onChange={handleOnChange} defaultValue="nombre">
						<option value="nombre">nombre</option>
						<option value="email">correo</option>
						<option value="idUsuario">id de usuario</option>
					</select>
				</div>
			</div>

			<button onClick={search} className="button is-fullwidth is-info">BUSCAR</button>

			<table className="table">
				<thead>
					<tr>
						<td>Id</td>
						<td>Avatar</td>
						<td>Nombre</td>
						<td>Correo</td>
						<td>Otorgar Hora(s)</td>
					</tr>
				</thead>
				<tbody>
					{ 
						users.length > 0
						&&
						users.map( (userObj, idx) => {
							let { _id, idUsuario, nombre, email, foto } = userObj;
							return(
								<tr key={idx}>
									<td>{idUsuario}</td>
									<td> <div className="image"> <img src={foto}/> </div> </td>
									<td>{nombre}</td>
									<td>{email}</td>
									<td> <div onClick={async ()=> await showAlert(_id, idUsuario, nombre)} className="button is-link">otorgar hora(s)</div> </td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
		</div>
	)
}

export default SearchUsers;