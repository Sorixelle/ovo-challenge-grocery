import React from 'react'

const GroceryItemList = ({ children }) => {
  return (
    <div className='list-group'>
      {children}
    </div>
  )
}

export default GroceryItemList
