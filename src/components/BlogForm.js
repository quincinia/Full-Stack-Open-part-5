import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    // The blog form does not track likes

    const addBlog = (event) => {
        event.preventDefault()

        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
            likes: 0    // Technically not needed
        })

        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input type="text" name="Title" value={newTitle} onChange={({ target }) => setNewTitle(target.value)}/>
                </div>
                <div>
                    author:
                    <input type="text" name="Author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}/>
                </div>
                <div>
                    url:
                    <input type="text" name="Url" value={newUrl} onChange={({ target }) => setNewUrl(target.value)}/>
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm