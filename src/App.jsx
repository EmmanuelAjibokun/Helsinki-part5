import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'


const Blogs = ({ blogs, user }) => {
  return (
    <div>
      <h2>blogs</h2>
      {console.log("Rendering Blogs component with user:", user)}
      <p>{user.username} logged in</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const result = JSON.parse(loggedUser)
      setUser(result)
      console.log("User loaded from localStorage:", result);
    } else {
      return;
    }
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])



  return user ? <Blogs blogs={blogs} user={user} /> : <Login setUser={setUser} setBlogs={setBlogs} />
}

export default App