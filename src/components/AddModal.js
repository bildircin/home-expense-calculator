import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import ListConsumer from '../context';
import uniqid from 'uniqid';

class AddModal extends Component {

    saveButtonclick(dispatch, e) {
        const addModalType = e.target.dataset.type
        
        if(addModalType == "general"){
            const date = document.querySelector('#dateInput').value

            const item = {
                id: uniqid(),
                date,
                productList:[],
                totalAmount:0
            }

            dispatch({type: "ADD_ITEM", payload:item})
        }else if(addModalType == "detail"){
            const productName = document.querySelector('#product_name').value
            const amount = document.querySelector('#amount').value

            dispatch({type: "ADD_DETAIL_ITEM", payload:{productName, amount}})
        }else if(addModalType == "edit"){
            
            dispatch({type: "EDIT_DETAIL_ITEM"})
        }

        this.cancelButtonClick(dispatch)
    }

    cancelButtonClick(dispatch) {
        dispatch({type:"ADD_MODAL_CLOSE"})
    }
    
    onChangeProductName(dispatch, e) {
        const value = e.target.value

        dispatch({type:"PRODUCT_NAME_CHANGE", payload:value})
    }
    
    onChangeAmount(dispatch, e) {
        const value = e.target.value

        dispatch({type:"AMOUNT_CHANGE", payload:value})
    }
    
    render() {
        return(
            <ListConsumer>
                {
                    value => {
                        const { dispatch, isShownAddModal, addModalType, listItem, generalItem } = value;
                        let form;
                        
                        if(addModalType == "general"){
                            form =  <Form>
                                        <Form.Group controlId='dateInput'>
                                            <Form.Label>Date</Form.Label>
                                            <Form.Control type='date' />
                                        </Form.Group>
                                    </Form>

                        }else if(addModalType == "detail"){
                            form =  <Form>
                                        <Form.Group controlId='product_name'>
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control type='text' />
                                        </Form.Group>
                                        <Form.Group controlId='amount'>
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control type='number' />
                                        </Form.Group>
                                    </Form>
                        }else if(addModalType == "edit") {
                            form =  <Form>
                                        <Form.Group controlId='product_name'>
                                            <Form.Label>Product Name</Form.Label>
                                            <Form.Control type='text' value={listItem.productName} onChange={this.onChangeProductName.bind(this, dispatch)} />
                                        </Form.Group>
                                        <Form.Group controlId='amount'>
                                            <Form.Label>Amount</Form.Label>
                                            <Form.Control type='number' value={listItem.amount} onChange={this.onChangeAmount.bind(this, dispatch)} />
                                        </Form.Group>
                                    </Form>
                        }
                        
                        return ReactDOM.createPortal(
                            <Modal show={isShownAddModal}>
                                <Modal.Header>
                                    <Modal.Title>Add Item</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                        {form}
                
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant='success' onClick={this.saveButtonclick.bind(this, dispatch)} data-type={addModalType} data-id={generalItem.id} >Save</Button>
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