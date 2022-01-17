import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then((blogs) => setBlogs(blogs))
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            // After successful login, update user and clear form
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            // Display notification
        }
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
            <p>{user.name} logged in</p>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
