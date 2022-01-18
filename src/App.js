import React, { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"

// Same notification scheme from previous parts
const Notification = (props) => {
    const { message, type } = props.message
    if (message === null) {
        return null
    }

    return <div className={type}>{message}</div>
}

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // For reference, user objects have the fields: { token, username, name }
    const [user, setUser] = useState(null)

    // For the blog form
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    // Likes are not currently being tracked, but putting them here for completeness
    const [newLikes, setNewLikes] = useState(0)

    // Notifications
    const [notifMessage, setNotifMessage] = useState({
        message: null,
        type: null
    })

    const displayNotif = (message, type) => {
        setNotifMessage({ message, type })
        setTimeout(() => {
            setNotifMessage({ message: null, type: null })
        }, 5000)
    }

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

            // Save our token
            blogService.setToken(user.token)

            // After successful login, update user and clear form
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            displayNotif('wrong username or password', 'error')
        }
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('loggedBloglistUser')
    }

    const loginForm = () => (
        <div>
            <h2>log in to application</h2>
            <Notification message={notifMessage} />
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

    const addBlog = async (event) => {
        event.preventDefault()

        try {
            const newBlog = await blogService.create({
                title: newTitle,
                author: newAuthor,
                url: newUrl,
                likes: newLikes
            })

            // Add new blog to state, and clear form
            setBlogs(blogs.concat(newBlog))
            setNewTitle('')
            setNewAuthor('')
            setNewUrl('')

            displayNotif(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
        } catch (exception) {
            displayNotif('error occurred trying to add new blog', 'error')
        }
    }

    const blogForm = () => (
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

    if (user === null) {
        return loginForm()
    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification message={notifMessage} />
            <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
            {blogForm()}
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    )
}

export default App
