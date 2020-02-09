import React, { useState, useEffect } from 'react'
import http from '../http'

import GroceryItemList from './GroceryItemList'
import GrocerySearch from './GrocerySearch'
import GroceryItem from './GroceryItem'

const GroceryListController = () => {
  const [items, updateItems] = useState([])
  const [hiddenItems, setHidden] = useState([])

  useEffect(() => {
    async function fetchItems () {
      const { data } = await http.get('/items')
      updateItems(data.items)
    }

    fetchItems()
  }, [])

  const searchProps = {
    items,
    updateItems,
    hiddenItems,
    setHidden
  }

  function updateItem (item, newData) {
    const newItems = [
      ...items.filter(i => i.item !== item),
      newData
    ]

    updateItems(newItems)
  }

  function deleteItem (item) {
    updateItems(items.filter(i => i.item !== item))
  }

  return (
    <div>
      <GrocerySearch {...searchProps} />
      <br />
      <GroceryItemList>
        {items.map(i => {
          if (hiddenItems.length !== 0 && hiddenItems.indexOf(i.item) >= 0) {
            return ''
          } else {
            return (
              <GroceryItem
                {...i} key={i.item}
                updateItem={updateItem} deleteItem={deleteItem}
              />
            )
          }
        })}
      </GroceryItemList>
    </div>
  )
}

export default GroceryListController
