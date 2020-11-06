import axios from 'axios'
const baseUrl = '/api/blogs/'

const createComment = async (comment, blog) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, comment)
  return response.data
}

export default { createComment } 