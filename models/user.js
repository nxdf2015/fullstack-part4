const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
  name : String,
  username : { type : String, required: true , minlength: 3 },
  password: { type : String, required: true }
})


UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {

    /* eslint-disable --  mutate object*/ 
     if(returnedObject._id) 
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      /* eslint-enable */
  },
})


const User = mongoose.model('user',UserSchema)


module.exports = User