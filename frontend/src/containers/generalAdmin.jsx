import React, { Component } from "react";
import config from '../config/config';
// components
import AdminJuegos from '../components/admin/juegos';
import Horario from '../components/admin/horario';
import Precio from '../components/admin/precio';


class AdminGeneral extends Component{

    state = {
        error: null,
        loading: false,
        arrJuegos: [],
        isAdmin: true,
        precio: 15000,
        // horario: null
        horario: {
            turnoCorrido: false,
            diasDeSemana: {
                morning: {
                    start: ["8","AM"],
                    end: ["12","AM"]
                },
                afternoon: {
                    start: ["2","PM"],
                    end: ["6","PM"]
                }
            },
            sabado: {
                morning: {
                    start: ["9","AM"],
                    end: ["12","AM"]
                },
                afternoon: {
                    start: ["2","PM"],
                    end: ["9","PM"]
                }
            },
            domingo: {
                morning: {
                    start: ["9","AM"],
                    end: ["12","AM"]
                },
                afternoon: {
                    start: ["2","PM"],
                    end: ["5","PM"]
                }
            },
        }
    }

    // controlar los juegos
    setGames = (arr) => this.setState({ arrJuegos: arr});
    // configurar horario
    getDataHorario = () => {
        let scheduleCopy = JSON.parse(JSON.stringify(this.state.horario));
        let inputs = [...document.querySelectorAll(".input-horario")];
        let corrido = document.querySelector(".horario-select").value == "corrido" ? true:false;
        let cont = 0;
        // iterar a travez del objeto horario, recordar que no importa el turno
        // la estructura del objeto horario sigue igual, solo sus valores cambian 
            scheduleCopy.turnoCorrido = corrido ? true : false;
            // cada uno de los dias
            let diasKeys = Object.keys(scheduleCopy);
            for(let i = 1; i < diasKeys.length; i++){
                // mañana y tarde
                let mananaYtarde = Object.values( scheduleCopy[diasKeys[i]] );
                if(corrido){
                    mananaYtarde[0].start[0] = inputs[cont].value;
                    mananaYtarde[1].end[0] = inputs[cont+1].value;
                    cont+=2;
                }else{
                    for(let turno of mananaYtarde ){
                        // principio y final de los turnos 
                        turno.start[0] = inputs[cont].value;
                        turno.end[0] = inputs[cont+1].value;
                        cont+=2;
                    }
                }
            }
        this.setState({ horario: scheduleCopy});  
    }

    // guardar todos los datos
    handleSend = () => {
        this.getDataHorario();
        console.log("se guardó");
    }

    // traer datos de la API
    fetchData = async () => {
        try {
            let negocioData = await fetch(`http://${config.domain}/admin/data/general`);
            let { precio, horario, juegos } = negocioData;    
           console.log(negocioData);
        } catch (err) {
            this.setState({ error: err});
        }
    }
    // llamar cuando se pinten por primera vez los componentes
    componentDidMount(){
        // this.fetchData();
    }

    render(){
        let { loading, error } = this.state;
        if(loading){
            return <h1>cargando!!</h1>
        }
        if(error){
            return <h1>a ocurrido un error {error}</h1>
        }

        return(
            <section className="general-admin-container">
                <button onClick={this.handleSend} className="button is-large is-success">guardar cambios</button>
                <div className="card">
                    < Precio precio={this.state.precio} />
                </div>
                <div className="card">
                    <Horario horario={this.state.horario} />
                </div>
                <div className="card">
                    <AdminJuegos {...this.state} setGames={this.setGames} />
                </div>
            </section>
        )
    }
}

export default AdminGeneral;