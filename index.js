const express = require('express');
// Register express server to app
const app = express();

// req = request coming into server
// res = response to send back to requester
// arrow function will be run anytime route is requested
app.get('/', (req, res) => {
  res.send({ hi: 'thre' });
});

// instructs express to tell node to listen for traffic on port 5000
const PORT = process.env.PORT || '5000';
app.listen(PORT, () => {
  console.log('Listening on port 5000');
});
