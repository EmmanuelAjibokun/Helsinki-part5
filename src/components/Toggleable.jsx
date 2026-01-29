import { useState, useImperativeHandle } from "react";

const Toggleable = (props) => {
  const [showContent, setShowContent] = useState(false);

  const toggleVisibility = () => {
    setShowContent(!showContent)
  }
  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return (
    <div>
      
      {
        showContent ? (
          props.children
        ) : (
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        )
      }
    </div>
  )
}

export default Toggleable