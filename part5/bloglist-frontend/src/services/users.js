import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl)
    return response.data
  } catch (error) {
    console.log(error)
    return error.response.data
  }
}

const createUser = async (userObject) => {
  try {
    const response = await axios.post(baseUrl, userObject)
    return response.data
  } catch (error) {
    console.error(error)
    return error.response.data
  }
}

export default { getAll, createUser }