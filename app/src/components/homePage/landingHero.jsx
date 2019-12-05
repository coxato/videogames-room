import React, { Component } from 'react';
// style
import './styles/landingHero.css';

// function HeroInfo({}){
// 	return(
//
// 	)
// }

class LandingHero extends Component{
	
	intervalAnimation=null;

	state = { fakePropToCanUpdate: false }

	componentDidMount(){
		this.setState({ fakePropToCanUpdate: true })
	}

	componentDidUpdate(){
		const caras = document.getElementById('caras');
		console.log('entro en componentDidUpdate')
		let degCount = 0;
		this.intervalAnimation = setInterval(() => {
			caras.style.transform = `translateZ(-300px) rotateX(${degCount}deg)`;
			degCount += 90;
		}, 7000);
	}

	componentWillUnmount(){
		clearInterval(this.intervalAnimation);
	}

	render(){
		return(
			<div className="landingHero-container">
		        <div className="caras" id="caras">
		            <div className="side one"> 
		            	<div className="infoHero">
							<h1 className="infoHero-title">Bienvenidos a masplay</h1>
							<div className="infoHero-content">una sala de videojuegos para toda la familia y tus amigos</div>
		            	</div> 
		            </div>
		            <div className="side two"> 
						<div className="infoHero">
							<h1 className="infoHero-title">Cómodas instalaciones</h1>
							<div className="infoHero-content">tenemos asientos puff para que puedas jugar a gusto</div>
		            	</div>
		            </div>
		            <div className="side three">
						<div className="infoHero">
							<h1 className="infoHero-title">prueba ya los simuladores!</h1>
							<div className="infoHero-content">contamos con simuladores de autos para que sientas toda la velocidad al jugar</div>
		            	</div>
		            </div>
		            <div className="side four">
						<div className="infoHero">
							<h1 className="infoHero-title">¿que esperas?</h1>
							<div className="infoHero-content">ven ya a masplay a divertirte y pasar un buen rato</div>
		            	</div>
		            </div>
		        </div>
    		</div>
		)
	}
}

export default LandingHero;