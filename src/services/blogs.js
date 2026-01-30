import axios from 'axios'

const BACKEND_URL="http://localhost:3003"
const baseUrl = BACKEND_URL ? `${BACKEND_URL}/api/blogs` : '/api/blogs'

let token = null
const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const deleteBlog = id => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${ baseUrl }/${id}`, config)
  return request.then(response => response.data)
}

export default { getAll, setToken, createBlog, update, deleteBlog }