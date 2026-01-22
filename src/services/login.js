import axios from "axios";
import blogService from './blogs'


const BACKEND_URL="http://localhost:3003"
const baseUrl = BACKEND_URL ? `${BACKEND_URL}/api` : '/api'

const login = async (credentials) => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  console.log("Login response data:", response.data);
  blogService.setToken(response.data.token)
  localStorage.setItem('loggedBlogappUser', JSON.stringify(response.data))
  return response.data
}

export default { login };