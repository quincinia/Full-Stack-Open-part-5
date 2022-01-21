import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, index, likeBlog, username, deleteBlog }) => {
    const [visible, setVisible] = useState(false)
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    const addLike = () => {
        const updateData = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1,
            user: blog.user.id
        }

        likeBlog(updateData, index, blog.id)
    }

    return (
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
            <div style={ { display: visible ? '' : 'none' } } className='details'>
                {blog.url}<br />
                likes {blog.likes}<button onClick={addLike}>like</button><br />
                {blog.author}<br />
                {
                    blog.user.username === username ?
                        <button onClick={() => deleteBlog(index)}>remove</button> :
                        null
                }
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    likeBlog: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    deleteBlog: PropTypes.func.isRequired
}

export default Blog