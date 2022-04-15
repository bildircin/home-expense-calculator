import React, { Component } from 'react';

const ListContext = React.createContext();

const reducer = (state,action) => {
    switch(action.type) {
        case "DELETE_ITEM":
            return {
                ...state,
                list: state.list.filter(item => action.payload != item.id)
            }
        case "ADD_ITEM":
            return {
                ...state,
                list: [...state.list, action.payload]
            }
        case "ADD_MODAL_OPEN":
            return {
                ...state,
                isShownAddModal:true
            }
        case "AMOUNT_MODAL_OPEN":

            const id = action.payload
            let list = [...state.list]
            const generalItem = list.find(el => el.id === id)

            return {
                ...state,
                isShownAmountModal:true,
                generalItem
            }
        case "ADD_MODAL_CLOSE":
            return {
                ...state,
                isShownAddModal:false
            }
        case "AMOUNT_MODAL_CLOSE":
            return {
                ...state,
                isShownAmountModal:false
            }
        default:
            return state
    }
}

export class ListProvider extends Component {

    state={
        isShownAddModal:false,
        isShownAmountModal:false,
        modalShown:false,
        list:[
            {
            id:"1",
            date:'22/01/2022',
            productList:[
                {
                id:1,
                productName:'elma',
                amount:25
                },
                {
                id:2,
                productName:'armut',
                amount:12
                }
            ],
            totalAmount:123
            },
            {
            id:"2",
            date:'23/01/2022',
            productList:[
                {
                id:1,
                productName:'muz',
                amount:25
                }
            ],
            totalAmount:234
            }
        ],
        generalItem:{
            id:null,
            date:'',
            productList:[{
                id:1,
                productName:'muz',
                amount:25
                }],
            totalAmount:0
        },
        listItem:[
            {
            id:1,
            productName:'muz',
            amount:25
            }
        ],
        dispatch: action => {
            this.setState(state => reducer(state,action))
        }
    }
    
    render() {
        return (
           <ListContext.Provider value={this.state}>
               {this.props.children}
           </ListContext.Provider>
        );
    }
}

const ListConsumer = ListContext.Consumer;

export default ListConsumer;

