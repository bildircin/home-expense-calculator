import React from "react";
import ListConsumer from "../context";
import { Button } from 'react-bootstrap';

class ItemTable extends React.Component{
    render(){

       return(
           <ListConsumer>
               {
                   value => {
                        let {generalItem} = value
                        let list = generalItem.productList.map(el => 
                               <tr>
                                   <td>{ el.id }</td>
                                   <td>{ el.productName }</td>
                                   <td>{ el.amount }</td>
                                   <td>
                                        <Button variant='primary' size='md' style={{ marginRight:'10px' }}  >Edit</Button>
                                        <Button variant='danger' size='md' >Remove</Button>
                                   </td>
                               </tr>
                           )
                        return(
                            <table className="ui celled table">
                                <thead>
                                    <tr><th>ID</th>
                                    <th>Product Name</th>
                                    <th>Amount</th>
                                    <th></th>
                                </tr></thead>
                                <tbody>
                                    { list }                                    
                                </tbody>
                            </table>
                        )
                   }
               }
           </ListConsumer>
       )
        
        
    }
}

export default ItemTable