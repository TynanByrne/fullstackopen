import blogService from '../services/blogs'

const initialState = []

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.postNew(blog)
    dispatch({
      type: 'POST_BLOG',
      data: newBlog
    })
  }
}

export const updateBlog = (blog) => {
  return async dispatch => {
    const updatedBlog = await blogService.updateBlog(blog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {

}

export const compare = (a, b) => {
  if (a.likes < b.likes) {
    return 1
  }
  if (a.likes > b.likes) {
    return -1
  }
  return 0
}

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.data
    case 'POST_BLOG':
      return [...state, action.data]
    case 'UPDATE_BLOG':
      const id = action.data.id
      const clickedBlog = state.find(x => x.id === id)
      const votedBlog = {
        ...clickedBlog, likes: clickedBlog.likes + 1
      }
      return state.map(blog =>
        blog.id === id ? votedBlog : blog
        ).sort(compare)
    default: return state
  }
}

export default blogsReducer