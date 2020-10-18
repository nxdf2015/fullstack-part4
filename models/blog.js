const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: { type: String,required : true },
  author:{ type : String,required : true },
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    /* eslint-disable --  mutate object*/  
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    /* eslint-enable */
  },
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog
