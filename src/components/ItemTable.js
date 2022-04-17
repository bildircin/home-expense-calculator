import React from "react";
import ListConsumer from "../context";
import { Button } from 'react-bootstrap';
import AmountShow from './AmountShow';

class ItemTable extends React.Component{

    editButtonClick(dispatch, e) {
        const id = e.target.dataset.id

        dispatch({type:"EDIT_ITEM", payload:id})
    }

    removeButtonClick(dispatch, e) {
        const id = e.target.dataset.id

        dispatch({type:"REMOVE_ITEM", payload:id})
    }
    
    render(){

       return(
           <ListConsumer>
               {
                   value => {
                        const {generalItem, dispatch} = value
                        let totalAmount = 0
                        if(generalItem.productList.length > 0){
                            totalAmount += (generalItem.productList.map(el => el.amount)).reduce((preVal, curVal) => preVal + curVal)
                        }
                        let list = generalItem.productList.map(el => 
                               <tr key={el.id}>
                                   <td className="text-center">{ el.id }</td>
                                   <td>{ el.productName }</td>
                                   <td className="text-center"> ₺{ el.amount }</td>
                                   <td className="text-center col-md-4">
                                        <Button variant='primary' size='md' style={{ marginRight:'10px' }} data-id={el.id} onClick={this.editButtonClick.bind(this, dispatch)} >Edit</Button>
                                        <Button variant='danger' size='md' data-id={el.id} onClick={this.removeButtonClick.bind(this, dispatch)}>Remove</Button>
                                   </td>
                               </tr>
                           )
                        return(
                            <React.StrictMode>
                                <table className="ui celled table">
                                    <thead>
                                        <tr>
                                            <th className="text-center">ID</th>
                                            <th>Product Name</th>
                                            <th className="text-center">Amount</th>
                                            <th className="text-center"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { list }                                    
                                    </tbody>
                                </table>
                                <AmountShow totalAmount={totalAmount} />
                            </React.StrictMode>
                        )
                   }
               }
           </ListConsumer>
       )
        
        
    }
}

export default ItemTable