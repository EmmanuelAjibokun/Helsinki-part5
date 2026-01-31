import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders title but not author, URL or likes by default', () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      username: 'testuser',
    },
  }

  const setBlogs = () => {}

  render(<Blog blog={blog} setBlogs={setBlogs} />)

  // Title should be visible by default
  expect(screen.getByText('Test Blog Title')).toBeInTheDocument()
  // expect(screen.getByText('Test Author')).toBeInTheDocument()

  // (hidden in Toggleable)
  expect(screen.queryByText('http://testblog.com')).not.toBeInTheDocument()
  expect(screen.queryByText(/5/)).not.toBeInTheDocument()
  expect(screen.queryByText('Test Author')).toBeNull()

})

test('renders blog\'s URL and number of likes when button clicked', async () => {
  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      username: 'testuser',
    },
  }

  const setBlogs = () => {}
  const user = userEvent.setup()

  render(<Blog blog={blog} setBlogs={setBlogs} />)

  // Click the view button to show details
  const button = screen.getByText('view')
  await user.click(button)

  // After clicking, URL, likes, and author should be visible
  expect(screen.getByText('http://testblog.com')).toBeInTheDocument()
  expect(screen.getByText(/5/)).toBeInTheDocument()
  expect(screen.getByText('Test Author')).toBeInTheDocument()
})
