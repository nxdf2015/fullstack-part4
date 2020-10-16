const dummy = () => 1


const totalLikes = (blogs) => blogs.reduce((acc,blog) => acc + blog.likes , 0 )

const favoriteBlog = (blogs) => blogs.reduce((acc,blog) => acc.likes < blog.likes ? blog : acc ,{ likes:0 })

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
