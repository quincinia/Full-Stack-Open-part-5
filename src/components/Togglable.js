import React,  { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    // Not using ternary operator like in the story
    const options = ['none', '']
    const hideWhenVisible = { display: options[!visible] }
    const showWhenVisible = { display: options[visible] }

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