import React from 'react'
import { render, act, fireEvent } from '@testing-library/react'
import http from '../../src/http'
import GroceryListController from '../../src/components/GroceryListController'

describe('GroceryListController', () => {
  const node = <GroceryListController />

  http.get.mockResolvedValue({
    data: {
      items: [
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
    }
  })

  it('should call axios on load', async () => {
    await act(async () => {
      render(node)
    })

    expect(http.get).toHaveBeenCalledTimes(1)
  })

  it('should populate the list with items', async () => {
    let renderResult
    await act(async () => {
      renderResult = render(node)
    })
    const { container } = renderResult

    const list = container.querySelector('div.list-group')
    expect(list.children.length).toBe(3)

    expect(container).toMatchSnapshot()
  })

  it('should filter items based on name', async () => {
    let renderResult
    await act(async () => {
      renderResult = render(node)
    })
    const {
      container,
      getByLabelText,
      getByText
    } = renderResult

    const textInput = getByLabelText('Search')
    fireEvent.change(textInput, {
      target: {
        value: 'Test 2'
      }
    })

    const list = container.querySelector('.list-group')
    expect(list.children.length).toBe(1)

    const testItem = getByText('1x Test 2')
    expect(container).toContainElement(testItem)
  })

  it('should filter items based on category', async () => {
    let renderResult
    await act(async () => {
      renderResult = render(node)
    })
    const {
      container,
      getByDisplayValue,
      getByText
    } = renderResult

    const categoryDropdown = getByDisplayValue('Filter categories...')
    fireEvent.change(categoryDropdown, {
      target: {
        value: 'Other Items'
      }
    })

    const list = container.querySelector('.list-group')
    expect(list.children.length).toBe(1)

    const testItem = getByText('1x Test 2')
    expect(container).toContainElement(testItem)
  })

  it('should transform into an add dialog if no matches are found', async () => {
    let renderResult
    await act(async () => {
      renderResult = render(node)
    })
    const {
      container,
      getByLabelText,
      getByPlaceholderText,
      getByDisplayValue,
      getByText
    } = renderResult

    const textInput = getByLabelText('Search')
    fireEvent.change(textInput, {
      target: {
        value: 'Test 4'
      }
    })

    const quantityInput = getByDisplayValue('1')
    const categoryInput = getByPlaceholderText('Category')
    const addButton = getByText('Add')

    expect(container).toContainElement(quantityInput)
    expect(container).toContainElement(categoryInput)
    expect(container).toContainElement(addButton)
  })

  it('should submit a new item', async () => {
    http.post.mockResolvedValue({
      data: {
        item: 'Test 4',
        category: 'Test Items',
        quantity: 5
      }
    })

    let renderResult
    await act(async () => {
      renderResult = render(node)
    })
    const {
      container,
      getByLabelText,
      findByDisplayValue,
      findByPlaceholderText,
      findByText
    } = renderResult

    const inputField = getByLabelText('Search')
    fireEvent.change(inputField, {
      target: {
        value: 'Test 4'
      }
    })

    const quantityField = await findByDisplayValue('1')
    fireEvent.change(quantityField, {
      target: {
        value: '5'
      }
    })

    const categoryField = await findByPlaceholderText('Category')
    fireEvent.change(categoryField, {
      target: {
        value: 'Test Items'
      }
    })

    const submitButton = await findByText('Add')
    await act(async () => {
      fireEvent.click(submitButton)
    })

    expect(http.post).toHaveBeenCalledTimes(1)
    expect(http.post).lastCalledWith('/add', {
      item: 'Test 4',
      category: 'Test Items',
      quantity: 5
    })

    expect(inputField).toHaveValue('')
    expect(container).not.toContainElement(quantityField)
    expect(container).not.toContainElement(categoryField)
  })

  it('should edit an item', async () => {
    http.patch.mockResolvedValue({
      data: {
        item: 'Test',
        category: 'New Category',
        quantity: 20
      }
    })

    let renderResult
    await act(async () => {
      renderResult = render(node)
    })
    const {
      container,
      getAllByText,
      findAllByText,
      findByDisplayValue
    } = renderResult

    const editSaveButton = getAllByText('Edit')[0]
    fireEvent.click(editSaveButton)

    const quantityField = await findByDisplayValue('1')
    fireEvent.change(quantityField, {
      target: {
        value: '20'
      }
    })

    const categoryField = await findByDisplayValue('Test Items')

    fireEvent.change(categoryField, {
      target: {
        value: 'New Category'
      }
    })

    await act(async () => {
      fireEvent.click(editSaveButton)
    })

    expect(http.patch).toHaveBeenCalledTimes(1)

    const categoryLabels = await findAllByText('New Category')

    expect(categoryLabels.length).toBe(2)
    expect(container).not.toContainElement(quantityField)
    expect(container).not.toContainElement(categoryField)
  })

  it('should delete an item', async () => {
    let renderResult
    await act(async () => {
      renderResult = render(node)
    })
    const {
      container,
      getAllByText,
      findByText
    } = renderResult

    const editButton = getAllByText('Edit')[0]
    fireEvent.click(editButton)

    const itemName = await findByText('Test')

    const deleteButton = await findByText('Delete')

    await act(async () => {
      fireEvent.click(deleteButton)
    })

    expect(http.delete).toHaveBeenCalledTimes(1)
    expect(http.delete).lastCalledWith('/item/Test')

    expect(container).not.toContainElement(itemName)
    expect(container).not.toContainElement(deleteButton)
    expect(container).not.toContainElement(editButton)
  })
})
