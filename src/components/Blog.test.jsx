import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Blog from './Blog'

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

  // Title and author should be visible by default
  expect(screen.getByText('Test Blog Title')).toBeInTheDocument()
  // expect(screen.getByText('Test Author')).toBeInTheDocument()

  // (hidden in Toggleable)
  expect(screen.queryByText('http://testblog.com')).not.toBeInTheDocument()
  expect(screen.queryByText(/5/)).not.toBeInTheDocument()
  expect(screen.queryByText('Test Author')).toBeNull()

})
