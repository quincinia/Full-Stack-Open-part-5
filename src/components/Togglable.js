import React,  { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    // Not using ternary operator like in the story
    // Apparently React doesn't like array indexing
    const options = ['none', '']
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable