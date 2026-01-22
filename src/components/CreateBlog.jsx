import React from 'react'
import blogService from '../services/blogs'

const CreateBlog = () => {
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
      window.location.reload();
    } catch (error) {
      console.error('Error creating blog:', error)
    }
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
      </form>
    </div>
  )
}

export default CreateBlog;