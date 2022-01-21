import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from '../components/Blog'

test('shows ONLY title and author by default', () => {
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

    // Confirm title and author
    expect(component.container).toHaveTextContent('Test blog Jacob Gayban')

    // Confirm details are hidden
    const details = component.container.querySelector('.details')
    expect(details).toHaveStyle('display: none')
})
