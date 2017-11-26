const mongoose = require('mongoose');
const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false
    });

    res.send(surveys);
  });
  // route for user completion of survey
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    // console.log(req.body);
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ url, email }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ email, surveyId, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();
    res.send({});
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
