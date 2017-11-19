const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  twitterId: String,
  fname: String,
  lname: String,
  avatar: String
});

// first argument name of collection
// second argument name of schema
mongoose.model('users', userSchema);
