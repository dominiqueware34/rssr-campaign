const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cookieSession = require('cookie-session'); // gives us access to cookies
const passport = require('passport');

require('./models/User');
require('./services/passport'); // brings in whole file
// connect to mongoosse
mongoose.connect(keys.MONGO_URI);

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 1 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/paymentsRoutes')(app);

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log('Listening on port 5000');
});
