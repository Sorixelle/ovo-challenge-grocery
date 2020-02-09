import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import GroceryItem from '../../src/components/GroceryItem'

describe('GroceryItem', () => {
  const node = <GroceryItem item='test' quantity='1' category='test' />
  it('should match the snapshot', () => {
    const { container } = render(node)
    expect(container).toMatchSnapshot()
  })

  it('should go into edit mode when the button is clicked', () => {
    const { getByText, getByDisplayValue, getByPlaceholderText } = render(node)

    const editButton = getByText('Edit')
    fireEvent.click(editButton)

    expect(editButton).toHaveClass('btn-success')
    expect(editButton).not.toHaveClass('btn-primary')

    const quantityInput = getByDisplayValue('1')
    expect(quantityInput).toBeInTheDocument()

    const categoryInput = getByPlaceholderText('Category')
    expect(categoryInput).toBeInTheDocument()
  })
})
