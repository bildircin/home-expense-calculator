import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ListConsumer from '../context';

class AddButton extends Component {

    onButtonClick(dispatch) {
        dispatch({type:"ADD_MODAL_OPEN", payload:null})
    }
    
    render() {
        return(
            <ListConsumer>
                {
                    value => {
                        const { dispatch } = value
                        return (
                            <Button variant="primary" onClick={this.onButtonClick.bind(this, dispatch)}>Add</Button>
                        )
                    }
                }
            </ListConsumer>
        )
    }
}

export default AddButton;