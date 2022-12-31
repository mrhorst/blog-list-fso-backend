const blogHelper = require('../utils/helper')

test('dummy returns one', () => {
  const blogs = []

  const result = blogHelper.dummy(blogs)
  expect(result).toBe(1)
})

test('when list has only one blog, equals the likes of that blog', () => {
  const result = blogHelper.totalLikes(blogHelper.listWithOneBlog)
  expect(result).toBe(9)
})

test('when the list has more than one blog, sum the number of likes of all blogs', () => {
  const result = blogHelper.totalLikes(blogHelper.listWithTwoBlogs)
  expect(result).toBe(6)
})

test('blog with the most likes', () => {
  const result = blogHelper.favoriteBlog(blogHelper.listWithMultipleBlogs)
  expect(result).toEqual({
    title: 'My blog 1',
    author: 'John Doe 1',
    likes: 91,
  })
})
test('blogs by an author', () => {
  const result = blogHelper.mostBlogs(blogHelper.listWithMultipleBlogs)
})

afterAll(() => {
  mongoose.connection.close()
})
