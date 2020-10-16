const dummy = () => 1


const totalLikes = (blogs) => blogs.reduce((acc,blog) => acc + blog.likes , 0 )

const favoriteBlog = (blogs) => blogs.reduce((acc,blog) => acc.likes < blog.likes ? blog : acc ,{ likes:0 })

const mostLikes= blogs => {const countBlogs = blogs.reduce((acc,blog) => {
  const author = blog.author
  acc[author] |= 0
  acc[author] += blog.likes
  return acc
},{} )
let authorMax = undefined
for(let [ author ,value]  of Object.entries(countBlogs)){
  if(!authorMax){
    authorMax=author
    continue
  }
  if (value> countBlogs[authorMax]){
    authorMax=author
  }
}
return { author: authorMax , blogs : countBlogs[authorMax] }
}

const  mostBlogs = (posts) => {
  const  authors= []
  let countBlog = []

  for (let post of posts){

    const author = post.author
    const id = authors.findIndex(a => a === author)

    if (id !== -1){
      countBlog[id]++
    }
    else{
      countBlog.push(1)
      authors.push(author)
    }


  }
  const mostBlog = Math.max(...countBlog)
  const idMax = countBlog.findIndex( i => i === mostBlog)

  return { author:authors[idMax], blogs:countBlog[idMax] }

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostLikes,
  mostBlogs
}
