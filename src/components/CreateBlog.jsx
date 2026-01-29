import React from 'react'
import blogService from '../services/blogs'

const CreateBlog = ({message, setBlogs, ref}) => {
  const [title, setTitle] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const [url, setUrl] = React.useState('')

  const handleCreate = async(event) => {
    event.preventDefault()
    // Logic to create a new blog goes here
    try {
      await blogService.createBlog({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      message.setSuccessMessage(`a new blog ${title} by ${author} added`)
      setInterval(() => {
        message.setSuccessMessage(null)
      }, 5000);

      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )

      ref.current.toggleVisibility()
    } catch (error) {
      console.error('Error creating blog:', error)
      message.setErrMessage(`failed: ${error.message}`)
      setInterval(() => {
        message.setErrMessage(null)
      }, 3000);
    }
  }

  const handleCancel = () => {
    ref.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        <div>
          <label htmlFor="title">Title: <input type="text" value={title} onChange={e => setTitle(e.target.value)} /></label>
        </div>
        <div>
          <label htmlFor="author">Author: <input type="text" value={author} onChange={e => setAuthor(e.target.value)} /></label>
        </div>
        <div>
          <label htmlFor="url">Url: <input type="text" value={url} onChange={e => setUrl(e.target.value)} /></label>
        </div>
        <button type='submit'>create</button>
        <button onClick={handleCancel}>cancel</button>
      </form>
    </div>
  )
}

export default CreateBlog;