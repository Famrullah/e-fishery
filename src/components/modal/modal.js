import React from 'react'
import Backdrop from '../backdrop/backdrop'

function Modal(props){
    console.log(props)
    return(
        <Backdrop show={props.show} modalClosed={props.modalClosed}>
            <div className="modal" 
                >
                {props.children}
            </div>
        </Backdrop>
    )
}

export default Modal