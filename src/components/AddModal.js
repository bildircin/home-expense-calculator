import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import ListConsumer from '../context';
import uniqid from 'uniqid';

class AddModal extends Component {

    saveButtonclick(dispatch) {
        const date = document.querySelector('#dateInput').value

        const item = {
            id: uniqid(),
            date,
            productList:[],
            totalAmount:0
        }
        
        dispatch({type: "ADD_ITEM", payload:item})

        this.cancelButtonClick()
    }

    cancelButtonClick(dispatch) {
        dispatch({type:"ADD_MODAL_CLOSE"})
    }
    
    render() {
        return(
            <ListConsumer>
                {
                    value => {
                        const { dispatch } = value;
                        const isShownAddModal = value.isShownAddModal

                        return ReactDOM.createPortal(
                            <Modal show={isShownAddModal}>
                                <Modal.Header>
                                    <Modal.Title>Add Item</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                
                                    <Form>
                                        <Form.Group controlId='dateInput'>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type='date' />
                                        </Form.Group>
                                    </Form>
                
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='success' onClick={this.saveButtonclick.bind(this, dispatch)}>Save</Button>
                                    <Button variant='secondary' onClick={this.cancelButtonClick.bind(this, dispatch)}>Cancel</Button>
                                </Modal.Footer>
                            </Modal>,
                            document.querySelector('#modal')
                        );
                    }
                }
            </ListConsumer>
        )
    }
}

export default AddModal;