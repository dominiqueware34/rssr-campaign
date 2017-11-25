const keys = require('../../config/keys');
module.exports = survey => {
  return `
      <html>
        <body styel="text-aligh: center;">
          <h3>I'd like your input!</h3>
          <p>Please answer the following question: </p>
          <p>${survey.body}</p>
          <div>
            <a href="${keys.REDIRECT_URL}/api/surveys/confirmation">yes</a>
          </div>
          <div>
            <a href="${keys.REDIRECT_URL}/api/surveys/confirmation">no</a>
          </div>

        </body>
      </html>

  `;
};
