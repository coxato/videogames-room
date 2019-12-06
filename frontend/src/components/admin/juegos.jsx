import React,{useState} from 'react';
import CatalogoJuegos from '../commons/catalogoJuegos';
// utils
import uploadPhoto from '../../utilities/uploadPhoto';

function AdminCatalogoJuegos({arrJuegos, setGames, isAdmin}){
    let [inputArr, setInputArr] = useState([]);
    
    return (
    <div>
        <CatalogoJuegos arrJuegos={arrJuegos} deleteGames={setGames} isAdmin={isAdmin} />
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
                        <button className="button is-link" onClick={async () => {
                                let newGames = await includeGamesToarr();
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
async function includeGamesToarr(){
    let newGames = [];
    let inputsContainers = [...document.querySelectorAll(".inputs-set-game")];
    // navegar entre los inputs
    for(let container of inputsContainers){
        let inputsText = container.querySelectorAll("input[type=text]"),
            inputFile = container.querySelector('input[type=file]');
               // guardar valores de los input text
               let gameObj = {
                   imageUrl: inputsText[0].value, 
                   nombre: inputsText[1].value, 
                   plataforma: inputsText[2].value                             
               };
               
               // si tiene una foto seleccionada
               if(inputFile.files[0]){
                    // hacer petición a la api para guardar la foto
                    let uploaded = await uploadPhoto(inputFile.files[0], 'fotoSubir', '/api/admin/upload')
                    // la foto se subió bien
                    if(uploaded.ok) gameObj.imageUrl = '/static/images/'+uploaded.filename;
                    else gameObj.imageUrl = '/static/images/default-game.jpg';
               }
               // si los campos están vacios, poner imagen por defecto
               if(typeof inputFile.files[0] === 'undefined' && inputsText[0].value == ''){
                    gameObj.imageUrl = '/static/images/default-game.jpg';
               }
               newGames.push(gameObj);
       
    }

    return newGames;
}
 
// interfaz para añadir juegos
function addGamesUi(){
    let setNewGame = ( <div className="column" key={Math.random() * 100 + Math.random()}>
                <div className="box has-background-light inputs-set-game">
                    <div className="field">
                        <label className="label">imagen de internet</label>
                        <input type="text" className="input" placeholder="imagen/url de la portada"/>
                    </div>

                    <div className="field">
                        <label className="label">subir foto desde equipo</label>
                        <input type="file" className="input" name="fotoSubir"/>
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
