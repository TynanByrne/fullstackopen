import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const postNew = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const req = await axios.post(baseUrl, newBlog, config)
  return req.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }
  const req = await axios.delete(`${baseUrl}/${blog._id}`, config)
  return req.data
}

export default { getAll, postNew, setToken, deleteBlog }