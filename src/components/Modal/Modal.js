import React from 'react';
import styled, { css } from 'styled-components';


export function ModalPub () {
    const [isPubMenu, setPubMenu] = React.useState(false);
    return (
        <ModalPub isPubMenu={isPubMenu}>
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h4 className="modal-title">Modal title</h4>
                </div>
                <div className="modal-body">
                    This is modal content
                </div>
                <div className="modal-footer">
                    <button className="button">Close</button>
                </div>
            </div>
        </div>
        </ModalPub>
    )
}



export default ModalPub;