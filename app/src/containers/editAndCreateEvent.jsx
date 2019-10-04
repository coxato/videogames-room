import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/editAndCreateEvent.css';

function EditAndCreateEvent(props) {
	console.log('the EditEvent props ', props);
	const isEdit = !!props.location.state;
	const initialState = isEdit ? { ...props.location.state.evento } : { }

	let [ evento, setEvento ] = useState( initialState );
	let { 
		_id,
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
		const name = ev.target.name;
		const value = ev.target.value;
		setEvento({
			...evento,
			[name]: value
		})
	}  

	const save = async (ev) => {
		ev.preventDefault();
		const makeOrEdit = isEdit ? ['update','PUT'] : ['create', 'POST'];
		try{
			const saved = await fetch(`/api/admin/${makeOrEdit[0]}/event`, {
				method: makeOrEdit[1],
				body: JSON.stringify({
                    ...evento
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
			})
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
					<div className="field">
						<label className="label">imagen del evento</label>
						<input type="text" className="input" name="imagen" value={imagen|| ''} onChange={edit} />
						<div className="image">
							<img src={imagen} />
						</div>
					</div>
					<button type="button" onClick={save} className="button is-medium is-fullwidth is-success">guardar</button>
				</form>

			</div>
		</section>
	)
}

export default EditAndCreateEvent;