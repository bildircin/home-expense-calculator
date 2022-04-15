import React from 'react';
import ListConsumer from '../context';
import { Table, Button} from 'react-bootstrap';

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
                            const  list  = value.list.map(el => 
                                <tr key={el.id}>
                                    <td className='text-center'> {el.id} </td>
                                    <td className='text-center'> {el.date} </td>
                                    <td className='text-center'> {el.totalAmount} </td>
                                    <td className='col-md-3 text-center'>
                                        <Button variant='primary' size='md' style={{ marginRight:'10px' }} data-id={el.id} onClick={this.editButtonClick.bind(this, dispatch)} >Edit</Button>
                                        <Button variant='danger' size='md' data-id={el.id} onClick={this.removeButtonClick.bind(this, dispatch) }>Remove</Button>
                                    </td>
                                </tr>
                                )

                            return(
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
                                    {list}
                                  </tbody>
                                </Table>
                            )
                        }
                    }
                </ListConsumer>
            )
       
    }
}

export default TotalAmountTable;