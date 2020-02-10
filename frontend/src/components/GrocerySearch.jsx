import React, { useState, useEffect } from 'react'
import http from '../http'

const GrocerySearch = ({ items, updateItems, hiddenItems, setHidden }) => {
  const [input, setInput] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

  const [newQuantity, setNewQuantity] = useState(1)
  const [newCategory, setNewCategory] = useState('')

  const categories = [...new Set(items.map(i => i.category).filter(i => i !== null))]

  useEffect(() => {
    setHidden(items
      .map(i => ({
        ...i,
        category: i.category === null ? '' : i.category
      }))
      .filter(i =>
        !i.item.toLowerCase().startsWith(input.toLowerCase()) ||
        (categoryFilter !== '' && i.category !== categoryFilter)
      )
      .map(i => i.item)
    )
  }, [input, categoryFilter])

  function handleDropdown (e) {
    setCategoryFilter(
      e.target.value === 'Filter categories...' ? '' : e.target.value
    )
  }

  async function submitItem () {
    const item = {
      item: input,
      quantity: parseInt(newQuantity)
    }
    if (newCategory !== '') {
      item.category = newCategory
    }

    const { data } = await http.post('/add', item)

    updateItems([...items, data])

    setInput('')
    setNewQuantity(1)
    setNewCategory('')
  }

  const itemNames = new Set(items.map(i => i.item))
  const addMode = hiddenItems.length === itemNames.size && hiddenItems.every(i => itemNames.has(i))

  return (
    <form className='input-group input-group-lg' onSubmit={submitItem}>
      {addMode
        ? (
          <div style={{ display: 'contents' }}>
            <input
              type='number' style={{ width: '15%' }}
              value={newQuantity} onChange={e => setNewQuantity(e.target.value)}
            />
            <input
              type='text' placeholder='Category'
              value={newCategory} onChange={e => setNewCategory(e.target.value)}
            />
          </div>
        ) : (
          <div className='input-group-prepend'>
            <label className='input-group-text' htmlFor='searchAddField'>
              Search
            </label>
          </div>
        )}
      <input
        id='searchAddField' className='form-control'
        type='text' value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className='input-group-append'>
        {addMode
          ? (
            <button
              className='btn btn-success' type='button'
              onClick={submitItem}
            >
              Add
            </button>
          ) : (
            <select onChange={handleDropdown} value={categoryFilter}>
              <option>Filter categories...</option>
              {categories.map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          )}
      </div>
    </form>
  )
}

export default GrocerySearch
