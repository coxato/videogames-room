import React from 'react';
import './styles/simpleModalHelp.css';

function ModalHelp({usuario, horasNecesarias, dontShow, setDontShow, eleccionPremio}) {
	return(
		<div className={`help-container ${dontShow ? 'dontShow': ''}`}>
			{/*<div className="closeModal-ayuda-container">*/}
				<div onClick={() => setDontShow(true)} className="closeModal-ayuda">Cerrar</div>
			{/* </div> */} 
			<div className="saludo-ayuda">
				<b>Hola {usuario}</b>, estás en la sección <b>mi perfil</b>, ésta
				sección es muy importante y útil para ti, ya que desde aqui puedes
				ingresar los <b>códigos</b> que te son proporcionados en masplay
				cada vez que vas a jugar. Además puedes ver cuantos puntos tienes acumulados y
				cuantas horas has sumado, asi como también tus premios ganados
				
				<h1 className="titulo-ayuda has-text-centered">¿Qué son esos botones?</h1>
				Verás, hay <b>dos botones</b> los cuales son: 
				<br/>
				<span className="hora-ayuda boton-ayuda">Ingresar código de hora</span> y <span className="premio-ayuda boton-ayuda">Canjear código de premio</span>
				<br/>
				<br/>
				El primero <span className="hora-ayuda boton-ayuda">Ingresar código de hora</span> te sirve para introducir <b>uno por uno</b> los 
				códigos que te son otorgados en masplay, si el código que introduciste es válido
				se procederá a sumarse 1 hora más a tu <b>contador de horas</b> (es el que vez a la derecha)
			
				<h1 className="titulo-ayuda has-text-centered">¿Y para qué me sirve ir sumando horas?</h1>
				A medida que vas sumando horas estás más cerca de <b><u>ganar un código de premio</u></b>,
				con ese código te ganas <b>{eleccionPremio} hora gratis de juego</b> en masplay, actualmente
				necesitas {horasNecesarias} códigos de tipo hora para ganar 1 premio
				
				<h1 className="titulo-ayuda has-text-centered">¿Cómo consigo ese premio?</h1> 
				Simplemente sumando horas, es decir, sumando códigos de tipo hora, una vez llegues
				a {horasNecesarias} horas o más, puedes canjear esas <b>horas por 1 código de premio</b> para
				canjearlas solo necesitas hacer click en el botón <span className="premio-ayuda boton-ayuda">Canjear código de premio</span>
				y automaticamente se revisará si cumples con las <b>minimas horas necesarias</b> para
				obtener un premio. De ser asi se <b>restarán</b> dichas horas a tu <b>contador de horas</b> y
				se te mostrará un código por pantalla, <b>ese sería tu codigo de premio</b>.
				
				<h1 className="titulo-ayuda has-text-centered">¿obtuve el código, qué hago con él?</h1>
				Si ya tienes un código solo debes <b>anotarlo</b> en algún lugar y mostrárselo a un encargado en masplay para que te
				de <b>tu hora gratis de juego</b>, dicho código tambien queda guardado en la sección de <b>premios ganados</b> que
				la puedes ver a la derecha.    
			</div>
		</div>
	)
}

export default ModalHelp;