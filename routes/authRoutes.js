const passport = require('passport');
module.exports = app => {
  // when user goes to login route
  // start ouath flow
  // passport will use google Strategy
  // passport.authenticate uses our above GoogleStrategy
  // scope tells google what we want to have access to
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );
  // this step is to retrieve user profile using code
  // passport will handle taking code from URL and turn into profile
  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    // logout passed in by passport. removes the cookie
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};