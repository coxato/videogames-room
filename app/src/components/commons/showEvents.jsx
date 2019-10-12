import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/showEvents.css';

const ShowEvents = ({events, isAdmin, deleteEvents = () => {} }) => {
    let originalHeights = [];
    let elements, buttons;  

    function showMore(index){
        console.log(index)
        if(getComputedStyle(elements[index]).height == "0px"){
            elements[index].style.height = originalHeights[index];
            buttons[index].textContent = "ver menos";
            buttons[index].classList.replace('is-info', 'is-primary');
        } 
        else{
            elements[index].style.height = "0px"; 
            buttons[index].textContent = "ver más";
            buttons[index].classList.replace('is-primary', 'is-info');
        }
    }

    useEffect(() => {
        if(events.length){
            // get the elements
            let ocultos = document.querySelectorAll('.oculto');
            let buttonsShow = document.querySelectorAll('.showMoreButton');
            // save the height and set to 0px
            for( let elmt of ocultos ){
                originalHeights.push( getComputedStyle(elmt).height );
                elmt.style.height = "0px";
            }
            // save the elements
            elements = ocultos;
            buttons = buttonsShow;
        }
    }, ) 

    return (
        <div className="showEvents-container columns is-multiline">
            { 
                events.map( (evento, index ) => {
                    let { _id, titulo, descripcion, fechaComienzo, fechaFinal, fechaMaximaInscripcion, premio,imagen, costoInscripcion, horaComienzo } = evento; 
                return (
                    <div className="column is-full" key={Math.random() + Math.random()}>


                        
                            <div className="container-flex-style-event">
                                { 
                                    isAdmin 
                                    && 
                                    <div className="buttons">

                                        <button onClick={() => deleteEvents(_id)} className="button is-danger is-medium">borrar</button> 
                                        {/* pass the _id and the*/}
                                        <Link to={
                                            {
                                                pathname: `/admin/evento/${_id}`,
                                                state: { evento }
                                            }
                                        } className="button is-warning is-medium">editar</Link>

                                    </div>
                                }
                                <div className="event-visible-flex">
                                    <div className="text-event-visible">
                                        <h1 className="title title-event">{titulo}</h1>
                                        <div className="comienzo-fin-event">
                                            <h1 className="title">comienzo: { fechaComienzo.split('-').reverse().join('/') }</h1>
                                            <h1 className="title">final: {fechaFinal.split('-').reverse().join('/')}</h1>
                                        </div>
                                    </div>
                                    <div className="image"><img src={imagen} alt={titulo}/></div>
                                </div>

                                <div className="oculto">
                                    <div className="box-descripcion">
                                        <h1 className="title">descripcion del evento</h1>
                                        <p className="subtitle">{descripcion}</p>
                                    </div>

                                    <div className="precios">
                                        <div className="box-precio">
                                            <h1 className="title">premio</h1>
                                            <p className="subtitle">{premio} bs</p>
                                        </div>
                                        
                                        <div className="box-precio">
                                            <h1 className="title">costo de la inscripción</h1>
                                            <p className="subtitle">{costoInscripcion} bs</p>
                                        </div>
                                    </div>

                                    <div className="box-fechas-limites">
                                        <h1 className="title">fecha máxima para inscribirse {fechaMaximaInscripcion.split('-').reverse().join('/')}</h1>
                                        <h1 className="title">se comenzará el dia {fechaComienzo.split('-').reverse().join('/')} a las {horaComienzo}</h1>
                                    </div>


                                </div>
                                <button className="button btn-event is-info is-fullwidth showMoreButton" onClick={() => showMore(index)}>ver más</button>
                            </div>
                        
                    </div>
                    );
                })
            }
        </div>
    )
}

export default ShowEvents;