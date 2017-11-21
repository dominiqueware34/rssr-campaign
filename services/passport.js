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
    async (accessToken, refreshToken, profile, done) => {
      const { id, id_str, profile_image_url_https, name } = profile._json;
      const foundUser = await User.findOne({ twitterId: id });

      if (foundUser) {
        return done(null, foundUser);
      }

      const user = await new User({
        twitterId: parseInt(id_str),
        name: name,
        twitterAvatar: profile_image_url_https
      }).save();

      done(null, user);
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
    async (accessToken, refreshToken, profile, done) => {
      const { name, id, photos } = profile;
      const foundUser = await User.findOne({ googleId: id });

      if (foundUser) {
        // console.log(user);
        // DONE: Tells passport user is authenticated
        // first argument: error
        // secound argument: user data
        return done(null, foundUser);
      }

      const user = await new User({
        googleId: id,
        name: `${name.givenName} ${name.familyName}`,
        googleAvatar: photos[0].value
      }).save();
      done(null, user);
    }
  )
);
