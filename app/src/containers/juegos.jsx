import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// components
import ShowGames from '../components/commons/catalogoJuegos';
import Loader from '../components/commons/loader';
// style
import './styles/juegos.css';

class Juegos extends Component{

    state = {
        loading: true,
        error: null,
        isAdmin: false,
        arrJuegos: null
    }

    async getGames(){
        try {
            let response = await fetch('/api/admin/data/general');
            let data = await response.json();
            this.setState({loading: false, arrJuegos: data.juegos });
        } catch (err) {
            this.setState({error: err});
        }
    }

    componentDidMount(){
        this.getGames();
    }

    render(){
        let { loading, error, arrJuegos, isAdmin, } = this.state;

        return (
            <section className="juegos-container">
                <h1 className="title has-text-centered">Juegos disponibles</h1>
                { 
                    loading ? 
                    <Loader />
                    : 
                    <div className="juegos-flex-container">
                    { 
                        arrJuegos.length > 0 
                        ? 
                        <div className="juegos">
                            <ShowGames { ...{isAdmin, arrJuegos } }/>
                        </div>
                        :
                        <div className="title">no hay juegos aún</div>
                    }
                    </div>     
                } 

                <h1 className="subtitle has-text-centered">y muchos más...</h1>
            
            </section>
        )
    }

}

export default Juegos;