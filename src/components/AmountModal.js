import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import ItemTable from './ItemTable';
import AmountShow from './AmountShow';
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
                                <Modal.Header closeButton>
                                    <Modal.Title>Amount Detail</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <ItemTable  />    
                                    <AmountShow  />
                                    <AddButton style={{ float:'right' }} />
                                
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="primary"> Save </Button>
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