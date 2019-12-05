import React, { Component } from 'react'
//import { Link } from 'react-router-dom';
// components
import ShowEvents from '../components/commons/showEvents';
import Loader from '../components/commons/loader';
// style
import './styles/eventos.css';

class Eventos extends Component{

    state = {
        loading: true,
        error: null,
        isAdmin: false,
        events: null
    }

    async getEvents(){
        try {
            let response = await fetch('/api/admin/eventos');
            let events = await response.json();
            this.setState({loading: false, events });
        } catch (err) {
            this.setState({error: err});
        }
    }

    componentDidMount(){
        this.getEvents();
    }

    render(){
        let { loading, error, events, isAdmin, } = this.state;

        return (
            <section className="eventos-container">
                <h1 className="title has-text-centered">Eventos</h1>
                { 
                    loading ? 
                    <Loader />
                    : 
                    <div className="eventos-flex-container">
                    { 
                        events.length > 0 
                        ? 
                        <div className="eventos">
                            <ShowEvents { ...{isAdmin, events } }/>
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