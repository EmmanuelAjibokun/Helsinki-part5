import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'

const Login = ({ setUser, setBlogs }) => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const [errMessage, setErrMessage] = React.useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setPassword('')
      setUsername('')
      setUser(user)
      console.log('login form submitted')
      await blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
    } catch (exception) {
      setErrMessage('wrong credentials')
      setPassword('')
      setUsername('')
      setTimeout(() => setErrMessage(null), 3000)
      console.error('login failed', exception)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <Notification message={errMessage} style={'error'} />
      <p>log in to application</p>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login