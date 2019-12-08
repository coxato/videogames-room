import React, { useState } from 'react';
import './styles/horario-home.css';

// input con los horarios
function InputHorario({turno, start, end}){
    return(
        <div className="inputs-horario">
            {/** inicio */}
            <div className="caja-horario">
                <div className="start-end has-background-info">inicio</div>
                <p min={0} max={12} className="input-horario-home" >{Number(start)}</p>
                <div className="am-pm">{turno === "" ? "AM" : turno === "tarde" ? "PM" : "AM" }</div>
            </div>
            {/** fin */}
            <div className="caja-horario">
                <div className="start-end has-background-info">fin</div>
                <p min={0} max={12} className="input-horario-home" >{Number(end)}</p>
                <div className="am-pm">{turno === "tarde" ? "PM" : turno === "" ? "PM" : "AM" }</div>
            </div>
        </div>
    )
}

// componente horario 
function Horario({horario}){
    let { turnoCorrido, diasDeSemana, sabado, domingo  } = horario,
    horarios = [diasDeSemana, sabado, domingo],
    dias = ["Lunes a viernes", "Sabado", "Domingo"];



    return(
        <div className="horario-container-home">

        <div className="title has-text-centered">Nuestro horario de atención</div>
            
            <div className="horario-der">
                <div className="dias-horario columns is-mobile is-multiline">
                    {/* LVSD == Lunes a Viernes, Sabado y Domingo */}
                    { horarios.map( (LVSD, index) => (
                        <div className="days-container column" key={dias[index]}>
                            <h1 className="title">{dias[index]}</h1>
                            <InputHorario 
                                turno={turnoCorrido ? "" : "mañana"} 
                                start={LVSD.morning.start[0]} 
                                end={ turnoCorrido ? LVSD.afternoon.end[0] : LVSD.morning.end[0] } 
                            />
                            {/* para la tarde */}
                            { 
                                !turnoCorrido && 
                                <InputHorario 
                                    turno="tarde" 
                                    start={ LVSD.afternoon.start[0] } 
                                    end={ LVSD.afternoon.end[0] } 
                                /> 
                            }
                        </div>
                    
                    )) }
                </div>
            </div>
        </div>
    )
}

export default Horario;