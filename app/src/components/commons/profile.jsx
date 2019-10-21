import React from 'react';
// styles
import './styles/profile.css';

function Profile({userData, onModalOpen, horasNecesarias}) {
  let { nombre, apellido, email, puntos, codigoPremioActual, contadorHoras, foto } = userData;
  
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

            <div className="premios-box cajita-info"> 
              <h2 className="puntos-title">Premios</h2>
              <p>{codigoPremioActual.length}</p>
            </div>
            
            <div className="horas-box cajita-info"> 
              <h2 className="puntos-title">Horas</h2>
              <p>{contadorHoras}/{horasNecesarias}</p> 
            </div>
          
          </div>

      </div>
    </section>
  )
}

export default Profile;