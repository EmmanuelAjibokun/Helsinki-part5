import { render, screen } from '@testing-library/react'
import { test, expect, vi } from 'vitest'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

vi.mock('../services/blogs', () => ({
  default: {
    update: vi.fn().mockResolvedValue({}),
    getAll: vi.fn().mockResolvedValue([]),
  },
}))

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

test('if the like button is clicked twice, the event handler is called twice', async () => {
  const blogService = await import('../services/blogs')

  const blog = {
    title: 'Test Blog Title',
    author: 'Test Author',
    url: 'http://testblog.com',
    likes: 5,
    user: {
      username: 'testuser',
    },
  }

  const setBlogs = vi.fn()
  const user = userEvent.setup()

  render(<Blog blog={blog} setBlogs={setBlogs} />)

  // Click the view button to show details
  const button = screen.getByText('view')
  await user.click(button)

  // Click like button twice
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  // Verify the update function was called twice
  expect(blogService.default.update).toHaveBeenCalledTimes(2)
})
