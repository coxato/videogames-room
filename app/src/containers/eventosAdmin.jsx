import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import { domain } from '../config/config';
// import events from '../../mooks/events';
// components
import ShowEvents from '../components/commons/showEvents';
import Loader from '../components/commons/loader';
// style
import './styles/eventos.css';

class Eventos extends Component{

    state = {
        loading: true,
        error: null,
        isAdmin: true,
        events: null
    }

    async getEvents(){
        try {
            console.log("getEvents se ejecutó")
            let response = await fetch(`/api/admin/eventos`);
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

    deleteEvents = async (id) => {
        try{
            console.log("antes del borrado rest")
            const deleted = await fetch(`/api/admin/delete/event/${id}`, {
                method: 'DELETE'
            });
            console.log(deleted)
            // reload the page
            console.log("linea antes del llamado a getEvents")
            this.getEvents()

        }catch(err){
            console.log(err);
        }
    }

    render(){
        let { loading, error, events, isAdmin, } = this.state;
        let { deleteEvents } = this;
        return (
            <section className="eventos-container">
                <h1 className="title has-text-centered">Eventos</h1>
                { isAdmin && <Link to="/admin/evento" className="button is-large is-link" >crear nuevo evento</Link> }
                { 
                    loading ? 
                    <Loader />
                    : 
                    <div className="eventos-flex-container">
                    { 
                        events.length > 0 
                        ? 
                        <div className="eventos">
                            <ShowEvents { ...{isAdmin, events, deleteEvents } }/>
                        </div>
                        :
                        <div className="title">no hay eventos aún</div>
                    }
                    </div>     
                } 
            </section>
        )
    }

}

export default Eventos;