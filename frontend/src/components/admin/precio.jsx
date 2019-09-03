import React from 'react';

const Precio = ({precio}) => (
    <div className="precio-container">
        <h1 className="title">Precio</h1>
        <div className="field">
            <div className="control">
                <input type="text" id="precio" className="input" defaultValue={precio}/>
                <div className="has-background-light">Bs</div>
            </div>
        </div>
    </div>
)

export default Precio;

