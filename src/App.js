import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    const handleLogin = async (event) => {

    }
    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <h2>log in to application</h2>
            <div>
                username
                <input type="text" value={username} onChange={({ target }) => setUsername(target)}/>
            </div>
            <div>
                password
                <input type="text" value={password} onChange={({ target }) => setPassword(target)}/>
            </div>
            <button type="submit">login</button>
        </form>
    )
    return (
        <div>
            {loginForm()}
            <h2>blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
