const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const TwitterStrategy = require('passport-twitter');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  // user: value we pulled from database
  // this sets cookie
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // turn id back into user
  User.findById(id).then(user => {
    done(null, user);
  });
});
passport.use(
  new TwitterStrategy(
    {
      consumerKey: keys.TWITTER_CONSUMER_KEY,
      consumerSecret: keys.TWITTER_CONSUMER_SECRET,
      callbackURL: '/auth/twitter/callback',
      proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
      const { id, id_str, profile_image_url_https, name } = profile._json;

      User.findOne({ twitterId: id }).then(user => {
        if (user) {
          console.log('FOUND TWITTER USER IN DB');
          done(null, user);
          return false;
        } else {
          console.log('CREATING NEW USER');
          console.log(parseInt(id_str));
          new User({
            twitterId: parseInt(id_str),
            name: name,
            twitterAvatar: profile_image_url_https
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
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
            name: `${name.givenName} ${name.familyName}`,
            googleAvatar: photos[0].value
          })
            .save()
            .then(user => done(null, user));
        }
      });
    }
  )
);
