import blogService from '../services/blogs'
import commentService from '../services/comments'

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

export const createBlog = (blog, user) => {
  return async dispatch => {
    const newBlog = await blogService.postNew(blog)
    dispatch({
      type: 'POST_BLOG',
      data: {
        ...newBlog, user: {
          username: user.username,
          name: user.name,
          id: user.id
        }
      }
    })
  }
}

export const updateBlog = (blog, user) => {
  return async dispatch => {
    let updatedBlog = await blogService.updateBlog(blog)
    console.log("BLOG IS", blog)
    console.log("UPDATED BLOG IS", updatedBlog)
    dispatch({
      type: 'UPDATE_BLOG',
      data: {
        ...updatedBlog,
        user: {
          name: user.username,
          username: user.username,
          id: user.id
        },
        comments: [...blog.comments]
      }
    })
  }
}

export const addComment = (blog, comment, user) => {
  return async dispatch => {
    const returnedComment = await commentService.createComment(comment, blog)
    const updatedBlog = blog
    updatedBlog.comments.push(returnedComment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: updatedBlog
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog
    })
  }
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
      return state.map(blog =>
        blog.id === action.data.id ? action.data : blog
      ).sort(compare)
    /* case 'ADD_COMMENT':
      return state.map(blog =>
        blog.id === action.data.blog.id ? action.data.blog.comments.push(comment) : blog) */
    case 'DELETE_BLOG':
      return state.filter(blog =>
        blog.id !== action.data.id)
    default: return state
  }
}

export default blogsReducer