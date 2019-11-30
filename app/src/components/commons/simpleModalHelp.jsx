import React from 'react';
import './styles/simpleModalHelp.css';

function ModalHelp({usuario, horasNecesarias, dontShow, setDontShow, eleccionPremio}) {
	return(
		<div className={`help-container ${dontShow ? 'dontShow': ''}`}>
			{/*<div className="closeModal-ayuda-container">*/}
				<div onClick={() => setDontShow(true)} className="closeModal-ayuda">Cerrar</div>
			{/* </div> */} 
			<div className="saludo-ayuda">
				<b>Hola {usuario[0].toUpperCase()+usuario.substring(1,usuario.length) }</b>, estás en la sección <b>Mi Perfil</b>, esta
				sección es muy importante y útil para ti porque desde aquí puedes
				ingresar los <b>códigos</b> que te son proporcionados
				cada vez que juegues en MasPlay. Además, puedes ver cuantos puntos tienes acumulados y
				cuantas horas has sumado, así como también tus premios ganados
				
				<h1 className="titulo-ayuda has-text-centered">¿Qué son esos botones?</h1>
				Verás, hay <b>dos botones</b> que son: 
				<br/>
				<span className="hora-ayuda boton-ayuda">Ingresar código de hora</span> y <span className="premio-ayuda boton-ayuda">Canjear código de premio</span>
				<br/>
				<br/>
				El primero, <span className="hora-ayuda boton-ayuda">Ingresar código de hora</span>, te sirve para introducir <b>uno por uno</b> los 
				códigos que te son otorgados en MasPlay. Si el código que introdujiste es válido,
				se procederá a sumarse 1 hora más a tu <b>contador de horas</b> (es el que vez a la derecha).
			
				<h1 className="titulo-ayuda has-text-centered">¿Y para qué me sirve ir sumando horas?</h1>
				A medida que vas sumando horas estás más cerca de <b><u>ganar un código de premio</u></b>,
				con ese código te ganas <b>{eleccionPremio} hora gratis de juego</b> en MasPlay. Actualmente
				necesitas {horasNecesarias} códigos de tipo hora para ganar 1 premio.
				
				<h1 className="titulo-ayuda has-text-centered">¿Cómo consigo ese premio?</h1> 
				Simplemente sumando horas, es decir, sumando códigos de tipo hora, una vez que llegues
				a {horasNecesarias} horas o más, puedes canjearlas por <b>1 código de premio.</b> Para
				canjearlas solo necesitas hacer click en el botón <br/> <span className="premio-ayuda boton-ayuda">Canjear código de premio</span>
				&nbsp; y automáticamente se revisará si cumples con las <b>mínimas horas necesarias</b> para
				obtenerlo. De ser así, se procederá a restar dichas horas a tu <b>contador de horas</b> y
				se mostrará un código en la pantalla, <b>ese sería tu codigo de premio</b>.
				
				<h1 className="titulo-ayuda has-text-centered">¿Obtuve el código de premio, qué hago con él?</h1>
				Si ya tienes un código solo debes <b>anotarlo</b> en algún lugar y mostrárselo a un encargado en MasPlay para que te
				de <b>tu tiempo gratis de juego</b>. Dicho código también queda guardado en la sección de <b>premios ganados</b> que
				puedes ver a la derecha en tu página de perfil.    
			</div>
		</div>
	)
}

export default ModalHelp;