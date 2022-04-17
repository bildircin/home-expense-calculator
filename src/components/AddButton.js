import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ListConsumer from '../context';

class AddButton extends Component {

    onButtonClick(dispatch, e) {
        const addModalType = e.target.dataset.type
        dispatch({type:"ADD_MODAL_OPEN", payload:addModalType})
    }
    
    render() {
        const type = this.props.type
        const styleFloat = type == "detail" ? "right" : ""
        return(
            <ListConsumer>
                {
                    value => {
                        const { dispatch } = value
                        return (
                            <Button variant="primary" style={ { float:styleFloat } } onClick={this.onButtonClick.bind(this, dispatch)} data-type={type}>Add</Button>
                        )
                    }
                }
            </ListConsumer>
        )
    }
}

export default AddButton;