import React from 'react';
import AmountModal from './components/AmountModal'
import TotalAmountTable from './components/TotalAmountTable';
import AddButton from './components/AddButton';
import AddModal from './components/AddModal';

class App extends React.Component {
  
  render(){
    return (
      <div>
        <div className="ui container">
            <h1 className="ui header center aligned" style={{ margin:'30px 0px' }}>Home Expense Calculator</h1>
            <TotalAmountTable />
            <AmountModal />
            <AddButton />
            <AddModal />
        </div>
      </div>
      
    )
  }
}

export default App;
