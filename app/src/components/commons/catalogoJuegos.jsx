import React from "react";

const CatalogoJuegos = ({arrJuegos, isAdmin, deleteGames}) => (
    <div className="columns is-multiline">
        { arrJuegos.map( (juego, index) => (
            <div className="juego column is-3" key={juego.imageUrl}>
                <div className="card">
                    <div className="image">
                        <img src={juego.imageUrl} alt={juego.nombre}/>
                    </div>
                    <div className="description-game has-text-centered">
                        <p className="subtitle">{juego.nombre}</p>
                        <p className="plataforma">{juego.plataforma}</p>
                    </div>
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