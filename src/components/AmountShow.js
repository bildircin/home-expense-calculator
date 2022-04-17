import React, { Component } from 'react';

class AmountShow extends Component {
    render() {
        return (
            <div style={{ display:'inline-block' }}>
                Total Amount: <span style={{ fontSize:"20px" }}><strong>₺{this.props.totalAmount}</strong></span>
            </div>
        );
    }
}

export default AmountShow;