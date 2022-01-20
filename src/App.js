import React, { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
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

    // Reference to blog form
    const blogFormRef = useRef()

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

    const addBlog = async (newBlog) => {
        try {
            const savedBlog = await blogService.create(newBlog)

            // Add new blog to state, and clear form
            setBlogs(blogs.concat(savedBlog))

            displayNotif(`a new blog ${savedBlog.title} by ${savedBlog.author} added`, 'success')

            blogFormRef.current.toggleVisibility()
        } catch (exception) {
            displayNotif('error occurred trying to add new blog', 'error')
            console.log(exception)
        }
    }

    const likeBlog = async (blog, index, blogId) => {
        try {
            // Not sure if you should delete the id beforehand?
            const savedBlog = await blogService.update(blog, blogId)

            const newBlogs = [...blogs]
            newBlogs[index].likes = savedBlog.likes
            setBlogs(newBlogs)
        } catch (exception) {
            displayNotif('error occurred trying to like that blog', 'error')
            console.log(exception)
        }
    }

    if (user === null) {
        return loginForm()
    }
    return (
        <div>
            <h2>blogs</h2>
            <Notification message={notifMessage} />
            <p>{user.name} logged in<button onClick={handleLogout}>logout</button></p>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={addBlog}/>
            </Togglable>
            {blogs.map((blog, index) => (
                <Blog key={blog.id} 
                      blog={blog} 
                      index={index}
                      likeBlog={likeBlog}
                />
            ))}
        </div>
    )
}

export default App
