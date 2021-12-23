import React from 'react';
import './styles/precio.css';

const Precio = ({precio}) => (
    <div className="precio-container">
        <h1 className="title">Precio de la hora</h1>
        <div className="field">
            <div className="control input-bs">
                <input type="number" id="precio" className="input" defaultValue={precio} min={1} required />
                <div className="has-background-light">$</div>
            </div>
        </div>
    </div>
)

export default Precio;

