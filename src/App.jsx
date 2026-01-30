import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'


const Blogs = ({ blogs, user, setBlogs }) => {
  const [successMessage, setSuccessMessage] = useState(null)
  const [errMessage, setErrMessage] = useState(null)

  const blogRef = useRef();

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={successMessage} style={"success"} />
      <Notification message={errMessage} style={"error"} />
      <span>{user.username} logged in</span><button onClick={handleLogout}>logout</button>
      <Toggleable buttonLabel={"Create Blog"} ref={blogRef} >
        <CreateBlog message={{setErrMessage, setSuccessMessage}} setBlogs={setBlogs} ref={blogRef} />
      </Toggleable>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} />
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
      blogService.setToken(result.token)
    } else {
      return;
    }
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    fetchBlogs()
  }, [])



  return user ? <Blogs blogs={blogs} user={user} setBlogs={setBlogs} /> : <Login setUser={setUser} setBlogs={setBlogs} />
}

export default App