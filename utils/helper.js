// import Blog from '../models/blog'

const dummy = (blogs) => {
  return 1
}

const listWithOneBlog = [
  {
    title: 'List with One Blog',
    author: 'One Blog',
    likes: 9,
  },
]

const listWithTwoBlogs = [
  {
    title: 'First of Two Blogs',
    author: 'First Blogger',
    likes: 2,
  },
  {
    title: 'Second of Two Blogs',
    author: 'Second Blogger',
    likes: 4,
  },
]

const listWithMultipleBlogs = [
  {
    title: 'My blog 1',
    author: 'John Doe 1',

    likes: 91,
  },
  {
    title: 'My blog 2',
    author: 'John Doe 2',

    likes: 44,
  },
  {
    title: 'My blog 3',
    author: 'John Doe 2',

    likes: 54,
  },
  {
    title: 'My blog 4',
    author: 'John Doe 4',

    likes: 41,
  },
  {
    title: 'My blog 5',
    author: 'John Doe 5',

    likes: 4,
  },
]

const initialBlogs = [
  {
    title: 'Initial 1',
    author: 'Author 1',
    likes: '1',
  },
  {
    title: 'Initial 2',
    author: 'Author 2',
    likes: '2',
  },
  {
    title: 'Initial 3',
    author: 'Author 3',
    likes: '3',
  },
  {
    title: 'Initial 4',
    author: 'Author 4',
    likes: '4',
  },
]

const totalLikes = (blogs) => {
  var likes = blogs.reduce((acc, cur) => {
    return acc + cur.likes
  }, 0)

  return likes
}

const favoriteBlog = (blogs) => {
  const result = {}
  blogs.forEach((blog) => {
    const { title, likes, author } = blog
    if (likes > result.likes) {
      result.title = title
      result.likes = likes
      result.author = author
    }
  })
  return result
}

const mostBlogs = (blogs) => {
  const counter = {}

  blogs.reduce((acc, cur) => {
    acc[cur.author] = (acc[cur.author] || 0) + 1
    return acc
  }, {})
}

const initialUsers = [
  {
    username: 'test',
    name: 'test',
    password: 'test',
  },
  {
    username: 'admin',
    name: 'admin',
    password: 'admin',
  },
]

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  listWithOneBlog,
  listWithTwoBlogs,
  listWithMultipleBlogs,
  initialBlogs,
  initialUsers,
}
