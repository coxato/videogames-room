import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import './styles/showNews.css';


const ShowNews = ({noticiasArr, isAdmin = false, deleteNews = () => {} }) => {
    let originalHeights = [];
    let elements, buttons;  

    function showMore(index){
        console.log(index)
        if(getComputedStyle(elements[index]).height == "0px"){
            elements[index].style.height = originalHeights[index];
            buttons[index].textContent = "leer menos";
            buttons[index].classList.replace('is-info', 'is-primary');
        } 
        else{
            elements[index].style.height = "0px"; 
            buttons[index].textContent = "leer más";
            buttons[index].classList.replace('is-primary', 'is-info');
        }
    }

    useEffect(() => {
        if(noticiasArr.length){
            // get the elements
            let ocultos = document.querySelectorAll('.oculto');
            let buttonsShow = document.querySelectorAll('.showMoreButton');
            // save the height and set to 0px
            for( let elmt of ocultos ){
                originalHeights.push( getComputedStyle(elmt).height );
                elmt.style.height = "0px";
            }
            // save the elements
            elements = ocultos;
            buttons = buttonsShow;
        }
    }, ) 

    return (
        <div className="showEvents-container columns is-multiline">
            { 
                noticiasArr.map( (noticia, index ) => {
                    let { _id, titulo, descripcion, fecha, imagen } = noticia; 
                return (
                    <div className="column is-full" key={Math.random() + Math.random()}>


                        
                            <div className="container-flex-style-event">
                                { 
                                    isAdmin 
                                    && 
                                    <div className="buttons">

                                        <button onClick={() => deleteNews(_id)} className="button is-danger is-medium">borrar</button> 
                                        {/* pass the _id and the*/}
                                        <Link to={
                                            {
                                                pathname: `/admin/noticia/${_id}`,
                                                state: { _id }
                                            }
                                        } className="button is-warning is-medium">editar</Link>

                                    </div>
                                }
                                <div className="news-visible-flex">
                                    <div className="text-event-visible">
                                        <h1 className="title">{titulo}</h1>
                                        <div className="comienzo-fin-event">
                                            <h1 className="subtitle fecha-news">fecha: {fecha}</h1>
                                        </div>
                                    </div>
                                    <div className="image"><img src={imagen} alt={titulo}/></div>
                                </div>

                                <div className="oculto">
                                    <p className="subtitle">{descripcion}</p>
                                </div>
                                <button className="button btn-event is-info is-fullwidth showMoreButton" onClick={() => showMore(index)}>leer más</button>
                            </div>
                        
                    </div>
                    );
                })
            }
        </div>
    )
}

export default ShowNews;