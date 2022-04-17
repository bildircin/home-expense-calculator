import React from 'react';
import ListConsumer from '../context';
import { Table, Button} from 'react-bootstrap';
import AmountShow from './AmountShow';

class TotalAmountTable extends React.Component{

    removeButtonClick = (dispatch, e) => {
        const id = e.target.dataset.id
        
        dispatch({type: "DELETE_ITEM", payload:id})
    }
    
    editButtonClick(dispatch, e) {
        const id = e.target.dataset.id

        dispatch({type:"AMOUNT_MODAL_OPEN", payload:id})
    }
   
    render(){
    
            return(
                <ListConsumer>
                    {
                        value => {
                            const {dispatch} = value;
                            let list = value.list
                            let editList  = list.map(el => 
                                <tr key={el.id}>
                                    <td className='text-center'> {el.id} </td>
                                    <td className='text-center'> {el.date} </td>
                                    <td className='text-center' style={{fontSize:"16px"}} ><strong> ₺{ el.productList.length > 0 ? (el.productList.map(el => el.amount)).reduce((preVal, curVal) => preVal + curVal) : 0 } </strong></td>
                                    <td className='col-md-3 text-center'>
                                        <Button variant='primary' size='md' style={{ marginRight:'10px' }} data-id={el.id} onClick={this.editButtonClick.bind(this, dispatch)} >List</Button>
                                        <Button variant='danger' size='md' data-id={el.id} onClick={this.removeButtonClick.bind(this, dispatch) }>Remove</Button>
                                    </td>
                                </tr>
                            )
                            let totalAmount = 0
                            for (let i = 0; i < list.length; i++) {
                                const item = list[i];

                                if(item.productList.length > 0){
                                    totalAmount += (item.productList.map(el => el.amount)).reduce((preVal, curVal) => preVal + curVal)
                                }
                            }

                            return(
                                <React.StrictMode>
                                    <Table bordered hover responsive>
                                        <thead>
                                            <tr>
                                                <th className='text-center'>ID</th>
                                                <th className='text-center'>Date</th>
                                                <th className='text-center'>End Of Day Total</th>
                                                <th className='col-md-3 text-center'></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {editList}
                                        </tbody>
                                    </Table>
                                    <div style={{ marginBottom:"15px" }}>
                                        <AmountShow totalAmount={totalAmount} />
                                    </div>
                                        
                                </React.StrictMode>
                            )
                        }
                    }
                </ListConsumer>
            )
       
    }
}

export default TotalAmountTable;