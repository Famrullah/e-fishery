import React from 'react'

const Backdrop = (props) => (
    props.show ? <div className="backdrop" onClick={props.modalClosed}>{props.children}</div>:null
);

export default Backdrop