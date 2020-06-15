import React from 'react'
import Backdrop from '../backdrop/backdrop'

const Modal = (props) =>(
    <React.Fragment>
        <Backdrop show={props.show} modalClosed={props.modalClosed}/>
        <div className="modal" 
            style={{
                opacity:props.show?'1':'0',
                transform: props.show ? 'translateY(0)':'translateY(-100vh)'
            }}
            >
            {props.children}
        </div>
    </React.Fragment>

)

export default Modal