import React from 'react'
import { render } from '@testing-library/react'
import GrocerySearch from '../../src/components/GrocerySearch'

describe('GrocerySearch', () => {
  const items = [
    {
      item: 'Test',
      category: 'Test Items',
      quantity: 1
    },
    {
      item: 'Test 2',
      category: 'Other Items',
      quantity: 1
    },
    {
      item: 'Test 3',
      category: null,
      quantity: 1
    }
  ]
  const node = <GrocerySearch items={items} hiddenItems={[]} setHidden={() => {}} />

  it('should match the snapshot', () => {
    const { container } = render(node)

    expect(container).toMatchSnapshot()
  })
})
