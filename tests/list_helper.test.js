const { test, expect } = require('@jest/globals')

const {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs,
} = require('../utils/list_helper')
const posts = require('./data')

test('dummy function return one', () => {
  const blog = []
  expect(dummy(blog)).toBe(1)
})

test(' return value of like when there is one post', () => {
  const posts = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
  ]

  expect(totalLikes(posts)).toBe(7)
})

test('2 return sum of likes of the list of posts', () => {
  expect(totalLikes(posts)).toBe(36)
})

test('finds out which blog has most likes', () => {
  expect(favoriteBlog(posts)).toEqual({
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  })
})

test('find author with most blog', () => {
  expect(mostLikes(posts)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 17 })
})

test('find author with most blog', () => {
  expect(mostBlogs(posts)).toEqual({
    author: 'Robert C. Martin',
    blogs: 3,
  })
})
