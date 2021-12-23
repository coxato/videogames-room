import React,{ useState } from 'react';
import { apiHost } from '../config/config';
//import { Link } from 'react-router-dom';
// utils
import uploadPhoto from '../utilities/uploadPhoto';
// styles
import './styles/editAndCreateEvent.css';

function EditAndCreateEvent(props) {
	console.log('the EditEvent props ', props);
	const isEdit = !!props.location.state;
	const initialState = isEdit ? { ...props.location.state.evento } : { }

	let [ evento, setEvento ] = useState( initialState );
	let { 
		titulo, 
		descripcion, 
		fechaComienzo, 
		fechaFinal, 
		fechaMaximaInscripcion, 
		premio,
		imagen, 
		costoInscripcion, 
		horaComienzo 
	} = evento;

	const edit = (ev) => {
		const input = ev.target;
		const name = input.name;
		let value;
		// check if the input is type file
		if(input.files){
			value = input.files[0];
		}else{
			value = input.value;
		}
		setEvento({
			...evento,
			[name]: value
		})
	}  

	const save = async (ev) => {
		ev.preventDefault();
		const makeOrEdit = isEdit ? ['update','PUT'] : ['create', 'POST'];
		// try save local disk photo
		let imageUrlToSave; // the url of image
		// check if want to upload a image
		if(evento.fotoSubir){
			try{
				let uploadResponse = await uploadPhoto(evento.fotoSubir, 'fotoSubir', `${apiHost}/api/admin/upload`);
				if(uploadResponse.ok) imageUrlToSave = apiHost+'/static/images/'+uploadResponse.filename;
				else imageUrlToSave = apiHost+'/static/images/default-game.jpg';
				
				// save the url in the evento object
				evento.imagen = imageUrlToSave;
			}catch(err){
				console.log(err);
			}

		}
		// check if the inputs to set a image are void, set default image
		if(evento.imagen === '' && !evento.archivo ) evento.imagen = '/static/images/default-game.jpg';


		try{
			const saved = await fetch(`${apiHost}/api/admin/${makeOrEdit[0]}/event`, {
				method: makeOrEdit[1],
				body: JSON.stringify({
                    ...evento
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem("token")
                }
			});
			console.log(saved);
		}catch(err){
			console.log(err);
		}
		// redirect to all events
		props.history.push('/admin/eventos');
	}


	return (
		<section className="editEvent-container columns is-centered">
			<div className="column is-half">

				<form className="form edit-create-form">
				<div className="title has-text-centered">{isEdit ? 'Editar' : 'Crear'} evento</div>
					<div className="field">
						<label className="label">titulo del evento</label>
						<input type="text" className="input" name="titulo" value={titulo || ''} onChange={edit} />
					</div>
					<div className="field">
						<label className="label">descripcion del evento</label>
						<textarea  className="textarea" name="descripcion" value={descripcion|| ''} onChange={edit}></textarea>
					</div>
					<div className="field">
						<label className="label">fecha de comienzo</label>
						<input type="date" className="input" name="fechaComienzo" value={fechaComienzo|| ''} onChange={edit} />
					</div>
					<div className="field">
						<label className="label">fecha de final</label>
						<input type="date" className="input" name="fechaFinal" value={fechaFinal|| ''} onChange={edit} />
					</div>
					<div className="field">
						<label className="label">fecha máxima para la inscripcion</label>
						<input type="date" className="input" name="fechaMaximaInscripcion" value={fechaMaximaInscripcion|| ''} onChange={edit} />
					</div>
					<div className="field">
						<label className="label">costo de la inscripcion</label>
						<input type="text" className="input" name="costoInscripcion" value={costoInscripcion|| ''} onChange={edit} />
					</div>
					<div className="field">
						<label className="label">premio a repartir</label>
						<input type="text" className="input" name="premio" value={premio|| ''} onChange={edit} />
					</div>
					<div className="field">
						<label className="label">hora de comienzo</label>
						<input type="text" className="input" name="horaComienzo" value={horaComienzo|| ''} onChange={edit} />
					</div>
					{/* internet url image */}
					<div className="field">
						<label className="label">imagen desde internet</label>
						<input type="text" className="input" name="imagen" value={imagen|| ''} onChange={edit} />
					</div>
					{/* local disk image */}
					<div className="field">
						<label className="label">subir imagen desde equipo</label>
						<input type="file" className="input" name="fotoSubir" onChange={edit} />
					</div>
					{/* image of event */}
					<div className="image">
						<img src={imagen} alt="event" />
					</div>
					<button type="button" onClick={save} className="button is-medium is-fullwidth is-success">guardar</button>
				</form>

			</div>
		</section>
	)
}

export default EditAndCreateEvent;