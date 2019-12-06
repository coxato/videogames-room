import React from 'react';
import { createPortal } from 'react-dom';
// style
import './styles/portalModal.css';

const Modal = props => {
    
    let {modalIsVisible, onModalClose, modalCategory } = props;

    if(!modalIsVisible) return null;

    return(
        createPortal(
            <div className="modal-container">
                <div className="flex-container-modal">
                    <div className="close-modal" onClick={() => onModalClose(modalCategory)} >
                        <p className="close-button-modal">X</p>
                    </div>
                    <div className="modal-content">
                        {props.children}
                    </div>
                </div>
            </div>
        , document.getElementById('modal'))
    )
}

export default Modal;