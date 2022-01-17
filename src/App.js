import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // For reference, user objects have the fields: { token, username, name }
    const [user, setUser] = useState(null)

    // Grab initial blogs
    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    // Look for logged in users
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
        }
    }, [])
    
    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            // Send login request
            const user = await loginService.login({
                username, password
            })

            // Save user info to local storage
            window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

            // After successful login, update user and clear form
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            // Display notification
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
    }

    const loginForm = () => (
        <div>
            <h2>log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)}/>
                </div>
                <div>
                    password
                    <input type="password" name="Password" value={password} onChange={({ target }) => setPassword(target.value)}/>
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )

    if (user === null) {
        return loginForm()
    }
    return (
        <div>
            <h2>blogs</h2>
            <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
