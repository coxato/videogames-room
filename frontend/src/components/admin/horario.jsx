import React, { useState } from 'react';
import './styles/horario.css';

// input con los horarios
function InputHorario({turno, start, end}){
    return(
        <form className="inputs-horario">
            <h3 className="subtitle">{turno}</h3>
            {/** inicio */}
            <div className="caja-horario">
                <div className="start-end has-background-info">inicio</div>
                <input type="number" min={0} max={12} className="input input-horario" defaultValue={Number(start)}/>
                <div className="am-pm">{turno == "" ? "AM" : turno == "tarde" ? "PM" : "AM" }</div>
            </div>
            {/** fin */}
            <div className="caja-horario">
                <div className="start-end has-background-info">fin</div>
                <input type="number" min={0} max={12} className="input input-horario" defaultValue={Number(end)}/>
                <div className="am-pm">{turno == "tarde" ? "PM" : turno == "" ? "PM" : "AM" }</div>
            </div>
        </form>
    )
}

// componente horario 
function Horario({horario}){
    let { turnoCorrido, diasDeSemana, sabado, domingo  } = horario,
    horarios = [diasDeSemana, sabado, domingo],
    dias = ["Lunes a viernes", "Sabado", "Domingo"];
    let [ turnoCorr, setTurno ] = useState(turnoCorrido);


    return(
        <div className="horario-container">
            <div className="horario-izq">
                <select name="turnoHorario" className="select horario-select" onChange={() => setTurno(turnoCorr = !turnoCorr) } defaultValue={turnoCorr ? "corrido" : "dosTurnos"}>
                    <option value="corrido">turno corrido</option>
                    <option value="dosTurnos">mañana y tarde</option>
                </select>
            </div>
            <div className="horario-der">
                <div className="dias-horario columns is-mobile is-multiline">
                    {/* LVSD == Lunes a Viernes, Sabado y Domingo */}
                    { horarios.map( (LVSD, index) => (
                        <div className="days-container column" key={dias[index]}>
                            <h1 className="title">{dias[index]}</h1>
                            < InputHorario 
                                turno={turnoCorr ? "" : "mañana"} 
                                start={LVSD.morning.start[0]} 
                                end={ turnoCorr ? LVSD.afternoon.end[0] : LVSD.morning.end[0] } 
                            />
                            {/* para la tarde */}
                            { 
                                !turnoCorr && 
                                < InputHorario 
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