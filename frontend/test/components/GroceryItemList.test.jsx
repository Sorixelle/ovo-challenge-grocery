import React from 'react'
import { render } from '@testing-library/react'
import GroceryItemList from '../../src/components/GroceryItemList'

describe('GroceryItemList', () => {
  const node = (
    <GroceryItemList>
      <p>Test</p>
    </GroceryItemList>
  )

  it('should match the snapshot', () => {
    const { container } = render(node)
    expect(container).toMatchSnapshot()
  })
})
