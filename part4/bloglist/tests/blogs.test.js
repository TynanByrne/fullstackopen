const listHelper = require('../utils/list_helper')
test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('1 blog with 1 like returns 1 like', () => {
  const blogs = [1]
  const result = listHelper.totalLikes(blogs)
  expect(result).toBe(1)
})

test('2 blogs with different numbers of likes, equals the sum of those likes', () => {
  const blogs = [
    {
      _id: '5f871821174381019c7c4b0f',
      title: 'A nice blog',
      author: 'Writy McWriteface',
      url: 'www.aniceblog.com',
      likes: 4,
      __v: 0
    },
    {
      _id: '5f871874174381019c7c4b10',
      title: 'How to be so cute he implodes: A quick guide!',
      author: 'Georgie',
      url: 'www.thegeorgieblogs.com',
      likes: 1,
      __v: 0
    }
  ]
  const result = listHelper.totalLikes(blogs.map(blogs => blogs.likes))
  expect(result).toBe(5)
})

test('2 blogs with different numbers of likes, blog with the most likes returned', () => {
  const blogs = [
    {
      _id: '5f871821174381019c7c4b0f',
      title: 'A nice blog',
      author: 'Writy McWriteface',
      url: 'www.aniceblog.com',
      likes: 4,
      __v: 0
    },
    {
      _id: '5f871874174381019c7c4b10',
      title: 'How to be so cute he implodes: A quick guide!',
      author: 'Georgie',
      url: 'www.thegeorgieblogs.com',
      likes: 1,
      __v: 0
    }
  ]
  const result = listHelper.favouriteBlog(blogs)
  expect(result).toEqual(blogs[0])
})

describe('finding the maximums', () => {
  test('2 blogs with different numbers of likes, blog with the most likes returned', () => {
    const blogs = [
      {
        _id: '5f871821174381019c7c4b0f',
        title: 'A nice blog',
        author: 'Writy McWriteface',
        url: 'www.aniceblog.com',
        likes: 4,
        __v: 0
      },
      {
        _id: '5f871874174381019c7c4b10',
        title: 'How to be so cute he implodes: A quick guide!',
        author: 'Georgie',
        url: 'www.thegeorgieblogs.com',
        likes: 1,
        __v: 0
      }
    ]
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(blogs[0])
  })

  test('3 blogs with different numbers of likes, blog with the most likes returned', () => {
    const blogs = [
      {
        _id: '5f871821174381019c7c4b0f',
        title: 'A nice blog',
        author: 'Writy McWriteface',
        url: 'www.aniceblog.com',
        likes: 4,
        __v: 0
      },
      {
        _id: '5f871874174381019c7c4b10',
        title: 'How to be so cute he implodes: A quick guide!',
        author: 'Georgie',
        url: 'www.thegeorgieblogs.com',
        likes: 1,
        __v: 0
      },
      {
        title: 'This one will win',
        likes: 2000000
      }
    ]
    const result = listHelper.favouriteBlog(blogs)
    expect(result).toEqual(blogs[2])
  })

  test('author that wrote the most blogs', () => {
    const blogs = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({
      author: 'Robert C. Martin',
      blogs: 3
    })
  })

  test('finding the author whose blogs have the most likes', () => {
    const blogs = [ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 }, { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 }, { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 }, { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 }, { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
    ]

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})