import { useRef, useState } from "react"
import Toggleable from "./Toggleable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    marginTop: 5,
  }

  const blogRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const buttonLabel = isVisible ? "hide" : "view"

  const handleShowDetails = () => {
    blogRef.current.toggleVisibility()
    setIsVisible(!isVisible)
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong>
        <button onClick={handleShowDetails}>{buttonLabel}</button>
      </div>
      <Toggleable buttonLabel="" ref={blogRef} style={{display: "flex", flexDirection: "column"}}>
        <span>{blog.url}</span>
        <span>{blog.likes}</span>
        <span>{blog.author}</span>
      </Toggleable>
    </div>  
  )
}

export default Blog