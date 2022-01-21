import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'

test('url and likes are shown after expanding', () => {
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

    const component = render(
        <Blog
            blog={blog}
            index={0}
            likeBlog={() => {}}
            username={'quincinia'}
            deleteBlog={() => {}}
        />
    )

    // Click button to show details
    const button = component.container.querySelector('button')
    fireEvent.click(button)

    const details = component.container.querySelector('.details')
    console.log(prettyDOM(details))

    // Display defaults to 'block' when set to ''
    expect(details).toHaveStyle('display: block')

    // There is no whitespace in between the url and 'likes'
    expect(details).toHaveTextContent('http://localhost/bloglistlikes 1000')
})
