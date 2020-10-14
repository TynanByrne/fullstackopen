const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue
  return blogs.reduce(reducer)
}

const favouriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  return blogs.find(blog => blog.likes === maxLikes)
}

const mostBlogs = (blogs) => {
  const timesRepeated = blogs.map(blog => blogs.filter(x => x.author === blog.author).length)
  console.log(timesRepeated)
  const winnerIndex = timesRepeated.indexOf(Math.max(...timesRepeated))
  const winner = blogs[winnerIndex]
  return {
    author: winner.author,
    blogs: Math.max(...timesRepeated)
  }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}