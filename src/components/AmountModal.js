import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import ItemTable from './ItemTable';
import AddButton from './AddButton';
import { Modal, Button } from 'react-bootstrap';
import ListConsumer from '../context';

class AmountModal extends React.Component{
    
    cancelButtonClick(dispatch) {
        dispatch({type:"AMOUNT_MODAL_CLOSE"})
    }
    
    render(){
        return(
            <ListConsumer>
                {
                    value => {
                        const {dispatch} = value
                        const {isShownAmountModal} = value
                        return ReactDOM.createPortal(
                            <Modal show={isShownAmountModal} size="lg">
                                <Modal.Header>
                                    <Modal.Title>Amount Detail</Modal.Title>
                                    <button type="button" className="btn-close" aria-label="Close" onClick={this.cancelButtonClick.bind(this, dispatch)}></button>
                                </Modal.Header>
                                <Modal.Body>

                                    <ItemTable  />    
                                
                                </Modal.Body>
                                <Modal.Footer>
                                    <AddButton type="detail" />
                                    <Button variant="secondary" onClick={this.cancelButtonClick.bind(this, dispatch) }>  Cancel </Button>
                                </Modal.Footer>
                            </Modal>,
                            document.querySelector('#modal')
                        )
                    }
                }
            </ListConsumer>
        )
    }
}

export default AmountModal;