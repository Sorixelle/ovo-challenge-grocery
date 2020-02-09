import React from 'react'

import GroceryListController from './components/GroceryListController'

const App = () => {
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-header'>
          <h3>Grocery List</h3>
        </div>
        <div className='card-body'>
          <GroceryListController />
        </div>
      </div>
    </div>
  )
}

export default App
