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
  const res = await axios.post(baseUrl, newBlog, config)
  return res.data
}

const updateBlog = async (updatedBlog) => {
  try {
    const res = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog)
    return res.data
  } catch (exception) {
    console.error(exception.response.data)
    return exception.response.data
  }

}

const deleteBlog = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token }
    }
    const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
    return res.data
  } catch (exception) {
    console.error(exception.response)
    return exception.response
  }

}

export default { getAll, postNew, setToken, deleteBlog, updateBlog }