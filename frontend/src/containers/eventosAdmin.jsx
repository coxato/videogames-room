import React, { Component } from 'react'
import { domain } from '../config/config';
import events from '../../mooks/events';
import './styles/eventos.css';
// components
// import CreateEvents from '../components/admin/createEvents';
import ShowEvents from '../components/commons/showEvents';

class Eventos extends Component{

    state = {
        loading: false,
        error: null,
        isAdmin: false,
        events,
    }

    async getEvents(){
        try {
            let response = await fetch(`http:${domain}/admin/eventos`);
            let events = await response.json();
            console.log("los eventos ", events);
            this.setState({loading: false, events });
        } catch (err) {
            this.setState({error: err});
        }
    }

    componentDidMount(){
        this.getEvents();
    }

    render(){
        let { loading, error, events, isAdmin } = this.state;
        return (
            <section className="eventos-container">
                <h1 className="title has-text-centered">Eventos</h1>
                { 
                    loading ? 
                    <h1>cargando...</h1> 
                    : 
                    <div className="eventos-flex-container">
                        <div className="eventos">
                            <ShowEvents isAdmin={isAdmin} events={events}/>
                        </div>
                        <div className="agregar-eventos-container">

                        </div>
                    </div>     
                } 
            </section>
        )
    }

}

export default Eventos;