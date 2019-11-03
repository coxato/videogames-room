import React, {useState} from 'react';
// components
import MyPrizeCodes from './myPrizeCodes';
import HelpModal from './simpleModalHelp';
// styles
import './styles/profile.css';

function Profile({userData, onModalOpen, horasNecesarias, eleccionPremio}) {
  let { nombre, apellido, email, puntos, codigoPremioActual, contadorHoras, foto } = userData;
  
  let [dontShow, setDontShow] = useState(true);

  return(
    <section className="profile-container">
      <div className="profile-izquierda">
        <div className="user-descripcion-profile">
          <div className="imagen-profile">
            <img src={foto} alt="masplay user"/>
          </div>
          <div className="datos-profile">
            <h1 className="title-user">{nombre} {apellido}</h1>
            <p className="username">{email}</p>
          </div>
        </div>

        <div className="botones-profile-codes">
          {/* help button */}
          <div id="show-help">
            <div className="image" onClick={() => setDontShow(false)}>
              <img src="/static/images/help.png" alt="ayuda masplay"/>
            </div>
            <h1 onClick={() => setDontShow(false)} className="subtitle">ayuda</h1>
          </div>
          <button className="button is-large ingresar-hora" onClick={() => onModalOpen('modalHourIsVisible')} >Ingresar código de hora</button>
          <button className="button is-large canjear-horas" onClick={() => onModalOpen('modalPrizeIsVisible')}>Canjear código de premio</button>
        </div>
      </div>

      <div className="profile-derecha">

          <div className="puntaje-flex">
            <div className="puntos-box cajita-info">
              <h2 className="puntos-title">Puntos</h2>
              <p>{puntos}</p>
            </div>  
            
            <div className="horas-box cajita-info"> 
              <h2 className="puntos-title">Horas</h2>
              <p>{contadorHoras}/{horasNecesarias}</p> 
            </div>
          </div>

          <div className="premios-ganados-container">
            <h1 className="title has-text-centered">premios ganados</h1>
            <MyPrizeCodes arrCodes={codigoPremioActual}/>
          </div>

      </div>

      {/* modal para la ayuda */}
      <HelpModal 
        dontShow={dontShow} 
        horasNecesarias={horasNecesarias} 
        usuario={nombre}
        setDontShow={setDontShow}
        eleccionPremio={eleccionPremio}
      />

    </section>
  )
}

export default Profile;