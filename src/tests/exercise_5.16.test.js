import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'

test('form input gets passed correctly', () => {
    const mockHandler = jest.fn()

    const component = render(<BlogForm createBlog={mockHandler} />)

    // Grab input fields
    const title = component.container.querySelector('[name="Title"]')
    const author = component.container.querySelector('[name="Author"]')
    const url = component.container.querySelector('[name="Url"]')

    // Input data
    fireEvent.change(title, {
        target: { value: 'Test blog' }
    })
    fireEvent.change(author, {
        target: { value: 'Jacob Gayban' }
    })
    fireEvent.change(url, {
        target: { value: 'http://localhost/bloglist' }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)

    // Component passes data inside an object, rather than with multiple params
    expect(mockHandler.mock.calls[0][0].title).toBe('Test blog')
    expect(mockHandler.mock.calls[0][0].author).toBe('Jacob Gayban')
    expect(mockHandler.mock.calls[0][0].url).toBe('http://localhost/bloglist')
})
