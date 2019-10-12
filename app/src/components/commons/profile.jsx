import React from 'react';
// styles
import './styles/profile.css';

function Profile({userData}) {
  let { nombre, apellido, email, puntos, codigoPremioActual, contadorHoras, foto } = userData;
  
  return(
    <div className="profile-container">
      <div className="profile-arriba">
        <div className="imagen-profile">
          <img src={foto} alt="masplay user"/>
        </div>

        <div className="datos-profile">
          <h1 className="title-user">{nombre} {apellido}</h1>
          <p className="username">{email}</p>
          <div className="puntos-horas-flex">

            <div className="puntos-box"> Puntos <br/> {puntos} </div>
            <div className="premios-box"> Premios <br/> {codigoPremioActual.length} </div>
            <div className="horas-box"> Horas <br/> {contadorHoras}/5 </div>
          
          </div>
        </div>
      
        <div className="botones-profile-codes">
          <button className="button is-large ingresar-hora">Ingresar código de hora</button>
          <button className="button is-large canjear-horas">Obtener código de premio</button>
        </div>
      </div>

      <div className="profile-abajo">


      </div>
    </div>
  )
}

export default Profile;