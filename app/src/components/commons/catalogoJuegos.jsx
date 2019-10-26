import React from "react";

const CatalogoJuegos = ({arrJuegos, isAdmin, deleteGames = () =>{}  }) => (
    <div className="columns is-multiline">
        { arrJuegos.map( (juego, index) => (
            <div className="juego column is-3" key={juego.imageUrl}>
                <div className="card carta">
                    <div className="image">
                        <img src={juego.imageUrl} alt={juego.nombre}/>
                    </div>
                    <ul className="list description-game has-text-centered">
                        <p className="list-item"><b>{juego.nombre}</b></p>
                        <p className="list-item plataforma">{juego.plataforma}</p>
                    </ul>
                    {/* borrar si es administrador */}
                    { 
                        isAdmin &&
                        <div className="button is-fullwidth has-background-danger" onClick={() => {
                            let arr = arrJuegos.slice(0,index).concat(arrJuegos.splice(index+1,arrJuegos.length+1));
                            deleteGames(arrJuegos = arr); 
                        }
                        }>borrar</div> 
                    }
                </div>
            </div>
        )) }
    </div>
);

export default CatalogoJuegos;