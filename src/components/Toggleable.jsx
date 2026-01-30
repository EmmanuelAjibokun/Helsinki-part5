import { useState, useImperativeHandle } from 'react'

const Toggleable = (props) => {
  const [showContent, setShowContent] = useState(false)

  const toggleVisibility = () => {
    setShowContent(!showContent)
  }
  useImperativeHandle(props.ref, () => {
    return { toggleVisibility, showContent }
  })
  console.log(!props.buttonLabel.typeof)

  return (
    <div style={props.style}>
      {
        showContent ? (
          props.children
        ) : (
          props.buttonLabel && <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        )
      }
    </div>
  )
}

export default Toggleable