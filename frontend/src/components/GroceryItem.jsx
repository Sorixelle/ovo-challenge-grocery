import React, { useState } from 'react'
import http from '../http'

function GroceryItem ({ item, quantity, category, updateItem, deleteItem }) {
  const [editMode, setEditMode] = useState(false)

  const [newQuantity, setQuantity] = useState(quantity)
  const [newCategory, setCategory] = useState(category === null ? '' : category)

  async function handleEdit () {
    const updatedItem = {
      quantity: parseInt(newQuantity)
    }
    if (newCategory !== '') {
      updatedItem.category = newCategory
    }

    const { data } = await http.patch(`/item/${item}`, updatedItem)

    updateItem(item, data)
    setEditMode(false)
  }

  async function handleDelete () {
    await http.delete(`/item/${item}`)

    deleteItem(item)
  }

  return (
    <div className='list-group-item'>
      {editMode
        ? (
          <input
            type='number' value={newQuantity}
            style={{ width: '5%' }} onChange={e => setQuantity(e.target.value)}
          />
        ) : quantity + 'x'}
      {' ' + item + ' '}
      {editMode
        ? (
          <input
            type='test' value={newCategory}
            placeholder='Category' onChange={e => setCategory(e.target.value)}
          />
        ) : <small className='text-muted'>{category}</small>}
      <a
        className={
          'btn text-white float-right ' + (editMode ? 'btn-success' : 'btn-primary')
        } onClick={() => {
          if (editMode) {
            handleEdit()
          } else {
            setEditMode(true)
          }
        }}
      >
        {editMode ? 'Save' : 'Edit'}
      </a>
      {editMode
        ? (
          <a
            className='btn btn-danger float-right text-white' onClick={handleDelete}
          >
            Delete
          </a>
        ) : ''}
    </div>
  )
}

export default GroceryItem
