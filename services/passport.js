const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  console.log('serializeUser user');
  console.log(user);
  // user: value we pulled from database
  // this sets cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('deserializeUser id');
  console.log(id);
  // turn id back into user
  User.findById(id).then(user => {
    console.log('deserializeUser find user');
    console.log(user);
    done(null, user);
  });
});
// passport.use() makes passport aware of strategies to use
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE_CLIENT_ID,
      clientSecret: keys.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      const { name, id, photos } = profile;
      User.findOne({ googleId: id }).then(user => {
        if (user) {
          // console.log(user);
          // DONE: Tells passport user is authenticated
          // first argument: error
          // secound argument: user data
          done(null, user);
          return false;
        } else {
          new User({
            googleId: id,
            fname: name.givenName,
            lname: name.familyName,
            avatar: photos[0].value
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
