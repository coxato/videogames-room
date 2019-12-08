import React, { Component } from "react";
import { apiHost } from '../../config/config';

// mooks
// import { precio, juegos, horario } from '../../mooks/general';
// components
import AdminJuegos from '../../components/admin/juegos';
import Horario from '../../components/admin/horario';
import Precio from '../../components/admin/precio';
import Loader from '../../components/commons/loader';
// style 
import './styles/generalAdmin.css';


class AdminGeneral extends Component{

    state = {
        error: null,
        loading: true,
        saving: false,
        arrJuegos: [],
        isAdmin: true,
        precio: null,
        horario: null
    }

    // controlar los juegos
    setGames = (arr) => this.setState({ arrJuegos: arr});
    // configurar horario
    getDataHorarioAndPrice = () => {
        let scheduleCopy = JSON.parse(JSON.stringify(this.state.horario)),
        inputs = [...document.querySelectorAll(".input-horario")],
        corrido = document.querySelector(".horario-select").value == "corrido" ? true:false,
        cont = 0,
        precio = document.getElementById("precio").value;
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
        return { scheduleCopy, precio };
    }


    // guardar todos los datos
    handleSend = async () => {
        let { scheduleCopy, precio } = this.getDataHorarioAndPrice();
        this.setState({ error: null, loading: false, saving: true});
        
        
        try {
            let allSaved = await fetch(`${apiHost}/api/admin/update/general`, {
                method: 'PUT',
                body: JSON.stringify({
                    horario: scheduleCopy,
                    juegos: this.state.arrJuegos,
                    precio,
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'x-access-token': sessionStorage.getItem("token")
                }
            });
            let responseJson = await allSaved.json();
            this.setState({ saving: false, precio, horario: scheduleCopy });

        } catch (err) {
            this.setState({ error: err, saving: false})
        }
    }

    // traer datos de la API
    fetchData = async () => {
        try {
            let negocioData = await fetch(`${apiHost}/api/admin/data/general`);
            let json = await negocioData.json();
            let { precio, horario, juegos } = json;
            this.setState({
                loading: false, precio, horario, arrJuegos: juegos
            })
        } catch (err) {
            this.setState({ error: err});
        }
    }
    // llamar cuando se pinten por primera vez los componentes
    componentDidMount(){
        this.fetchData();
    }
 
    render(){
        let { loading, error, saving } = this.state;
        if(loading) return <Loader />

        if(saving) return <Loader /> 

        if(error) return <h1>a ocurrido un error {error}</h1>

        return(
            <section className="general-admin-container">
                <div className="general-admin-wrapper">
                    <button onClick={this.handleSend} className="button is-large is-success">guardar cambios</button>
                    <div className="card precio-card">
                        <Precio precio={this.state.precio} />
                    </div>
                    <div className="card horario-card">
                        <h1 className="title has-text-centered">Horario</h1>
                        <Horario horario={this.state.horario} />
                    </div>
                    <div className="card juegos-card">
                        <AdminJuegos {...this.state} setGames={this.setGames} />
                    </div>
                </div>
            </section>
        )
    }
}

export default AdminGeneral;