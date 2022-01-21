import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

test('2 clicks => 2 likes', () => {
    const blog = {
        title: 'Test blog',
        author: 'Jacob Gayban',
        url: 'http://localhost/bloglist',
        likes: 1000,
        user: {
            username: 'quincinia',
            name: 'jacob gayban',
            id: '61df9ef69f1447a67ae38cff'
        },
        id: '61dfa32c25c57af36c6dc95d'
    }

    const mockHandler = jest.fn()

    const component = render(
        <Blog
            blog={blog}
            index={0}
            likeBlog={mockHandler}
            username={'quincinia'}
            deleteBlog={() => {}}
        />
    )

    // Click button to show details
    const button = component.container.querySelector('.details > button')
    console.log(prettyDOM(button))

    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
