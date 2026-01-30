import { useRef, useState } from "react"
import Toggleable from "./Toggleable"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs }) => {
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
  const authorizedUser = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))?.username === blog.user?.username

  const handleShowDetails = () => {
    blogRef.current.toggleVisibility()
    setIsVisible(!isVisible)
  }

  const handleLike = async () => {
    // Logic to handle liking the blog goes here
    const updatedBlog = {title: blog.title, author: blog.author, url: blog.url, likes: blog.likes + 1, id: blog.id};
    // Normally, you would also update the blog on the server here
    try {
      await blogService.update(blog.id, updatedBlog)
      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (error) {
      console.error('Error updating blog likes:', error)
    }
  }

  const handleDelete = async () => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    try {
      await blogService.deleteBlog(blog.id)
      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (error) {
      console.error('Error deleting blog:', error)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong>
        <button onClick={handleShowDetails}>{buttonLabel}</button>
      </div>
      <Toggleable buttonLabel="" ref={blogRef} style={{display: "flex", flexDirection: "column"}}>
        <span>{blog.url}</span>
        <span>{blog.likes} <button onClick={handleLike}>like</button></span>
        <span>{blog.author}</span>
        {authorizedUser && <button onClick={handleDelete} style={{background: 'red', color: 'white', cursor: 'pointer', width: 'fit-content'}}>remove</button>}
      </Toggleable>
    </div>  
  )
}

export default Blog