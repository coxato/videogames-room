import React,{useState} from 'react';
import CatalogoJuegos from './catalogoJuegos';


function AdminCatalogoJuegos({arrJuegos, setGames, isAdmin}){
    let [inputArr, setInputArr] = useState([]);
    
    return (
    <div>
        < CatalogoJuegos arrJuegos={arrJuegos} deleteGames={setGames} isAdmin={isAdmin} />
        {/* añadir juegos si es administrador */}
        { 
            isAdmin &&
            <div className="add-juegos">
                <div className="columns is-multiline">
                    { inputArr }
                </div>
                <div className="field is-grouped">
                    <div className="control">
                        <button onClick={() => setInputArr(inputArr.concat(addGamesUi()) ) } className="button is-success">
                            añadir juego
                        </button>
                    </div>
                    <div className="control">
                        <button className="button is-link" onClick={() => {
                                let newGames = includeGamesToarr();
                                setInputArr([]);
                                setGames(arrJuegos.concat(newGames))}
                            }>
                            incluir juegos
                        </button>
                    </div>
                </div>
            </div>  
        }
    </div>
    )
}

// añadir los nuevos juegos al array de juegos
function includeGamesToarr(){
    let newGames = [];
    let inputsContainers = [...document.querySelectorAll(".inputs-set-game")];
    // navegar entre los inputs
    for(let container of inputsContainers){
        let inputs = container.getElementsByTagName("input");
       if(inputs[0].value){
           let i = 0;
           newGames.push({
               imageUrl: inputs[i++].value,
               nombre: inputs[i++].value,
               plataforma: inputs[i++].value
           })
       }
    }

    return newGames;
}

// interfaz para añadir juegos
function addGamesUi(){
    let setNewGame = ( <div className="column" key={Math.random() * 100 + Math.random() * 100}>
                <div className="box has-background-light inputs-set-game">
                    <div className="field">
                        <label className="label">imagen</label>
                        <input type="text" className="input" placeholder="imagen/url de la portada"/>
                    </div>
                    <div className="field">
                        <label className="label">nombre</label>
                        <input type="text" className="input" placeholder="nombre del juego"/>
                    </div>
                    <div className="field">
                        <label className="label">consola</label>
                        <input type="text" className="input" placeholder="nombre de consola"/>
                    </div>
                </div>
            </div> )
    
    return setNewGame;
}

export default AdminCatalogoJuegos;
