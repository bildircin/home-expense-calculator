import React, { Component } from 'react';

class AmountShow extends Component {
    render() {
        return (
            <div style={{ display:'inline-block' }}>
                Total Amount: {this.props.totalAmount} ₺
            </div>
        );
    }
}

export default AmountShow;