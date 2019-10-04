import React from 'react';
// style
import './styles/loader.css';

const Loader = props => { 
    return(
        <div className="loader-container">
            <div className="grande">
                <div className="mediano">
                    <div className="pequeno"></div>
                </div>
            </div>
        </div>
    )
}

export default Loader;