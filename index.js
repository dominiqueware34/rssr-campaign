const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('express-flash-messages');
const keys = require('./config/keys');
const cookieSession = require('cookie-session'); // gives us access to cookies
const passport = require('passport');

require('./models/User');
require('./models/Survey');
require('./services/passport'); // brings in whole file
// connect to mongoosse
mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGO_URI);

const app = express();

app.use(flash());
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
require('./routes/surveyRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  // express will serve produciton assets (e.g main.js )
  app.use(express.static('client/build'));
  // express will serve index.html if it doesnt know route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log('Listening on port 5000');
});
