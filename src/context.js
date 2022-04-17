import React, { Component } from 'react';
import uniqid from 'uniqid';

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
            const addModalType = action.payload

            return {
                ...state,
                isShownAddModal:true,
                addModalType
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
        case "ADD_DETAIL_ITEM":
            const amount = parseInt(action.payload.amount)
            const productName = action.payload.productName
            const generalItemId = state.generalItem.id
            let list1 = [...state.list]

            let item = {...state.generalItem}
            item.productList.push({
                id:uniqid(),
                amount,
                productName
            })

            list1 = list1.filter(el => el.id != generalItemId)
            list1 = [...list1, item]
            
            return {
                ...state,
                list:list1
            }
        case "EDIT_ITEM":
            const editId = action.payload
            const generalItemProductList = [...state.generalItem.productList]
            const editItem = generalItemProductList.filter(el => el.id == editId)[0]

            return{
                ...state,
                listItem:editItem,
                addModalType:"edit",
                isShownAddModal:true
            }
        case "PRODUCT_NAME_CHANGE":
            const pName = action.payload
            return {
                ...state,
                listItem:{...state.listItem, productName:pName}
            }
        case "AMOUNT_CHANGE":
            const amountName = parseInt(action.payload)
            return {
                ...state,
                listItem:{...state.listItem, amount:amountName}
            }
        case "EDIT_DETAIL_ITEM":
            let gItem = {...state.generalItem}
            let lItem = {...state.listItem}
            let filteredProductList = gItem.productList.filter(el => el.id !== lItem.id)
            gItem = {...gItem, productList:[...filteredProductList, lItem]}

            let listEdit = [...state.list]
            listEdit = listEdit.filter(el => el.id !== gItem.id)
            listEdit = [...listEdit, gItem]

            return{
                ...state,
                list: listEdit,
                generalItem:gItem,
                listItem:lItem
            }
        case "REMOVE_ITEM":
            const removeId = action.payload
            const genItemId = state.generalItem.id
            
            let stList = [...state.list]
            stList = stList.filter(el => el.id != genItemId)
            let genItemProductList = [...state.generalItem.productList]
            genItemProductList = genItemProductList.filter(el => el.id != removeId)
            let generalItemNew = {...state.generalItem, productList:genItemProductList}
            let listNew = [...stList, generalItemNew]

            return{
                ...state,
                generalItem:generalItemNew,
                list:listNew
            }
        default:
            return state
    }
}

export class ListProvider extends Component {

    state={
        addModalType:"general",
        isShownAddModal:false,
        isShownAmountModal:false,
        modalShown:false,
        list:[
            {
            id:"l22ekyy7",
            date:'2022-01-12',
            productList:[
                {
                id:"l22enkkq",
                productName:'elma',
                amount:25
                },
                {
                id:"l22enstd",
                productName:'armut',
                amount:12
                }
            ]
            },
            {
            id:"yy4ek127",
            date:'2022-03-25',
            productList:[
                {
                id:"l22enzvy",
                productName:'muz',
                amount:25
                }
            ]
            }
        ],
        generalItem:{
            id:null,
            date:'',
            productList:[{
                id:"1",
                productName:'muz',
                amount:25
                }]
        },
        listItem: {
            id:"1",
            productName:'muz',
            amount:25
            },
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

