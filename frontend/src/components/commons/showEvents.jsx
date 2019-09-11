import React from 'react';

const ShowEvents = ({events, isAdmin}) => {
    return (
        <div className="showEvents-container columns">
            { 
                events.map( (evento) => {
                    let { titulo } = evento; 
                return (
                    <div className="column is-full">
                        <div className="card">

                        </div>
                    </div>
                    );
                })
            }
        </div>
    )
}

export default ShowEvents;