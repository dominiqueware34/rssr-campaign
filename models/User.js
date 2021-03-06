const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  twitterId: String,
  name: String,
  credits: {
    type: Number,
    default: 0
  },
  googleAvatar: String,
  twitterAvatar: String,
  gravatar: String
});

// first argument name of collection
// second argument name of schema
mongoose.model('users', userSchema);
