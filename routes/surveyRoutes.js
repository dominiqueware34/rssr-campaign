const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/confirmation', (req, res) => {
    res.send('Thanks for voting!');
  });

  // create and send survey
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    // user logged in && have credits
    const { title, body, subject, recipients, flight } = req.body;

    const survey = new Survey({
      title,
      body,
      subject,
      flight,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // Send email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    // wait for mailer to send emails
    try {
      await mailer.send();

      // save survey to database
      await survey.save();
      // deduct one credits
      req.user.credits -= 1;
      // save returns the updated user
      const user = await req.user.save();
      res.send(user);
    } catch (e) {
      res.status(422).send(err); // unproccesable entity
    }
  });
};
