import 'jquery';
import './assets/css/fonts.css';
import './assets/css/main.css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import reducers from './reducers';
import App from './components/App';

const survey = {
  title: 'my title',
  body: 'Did you enjoy our services',
  subject: 'Give us Feedback',
  recipients: 'dominiqueware34@yahoo.com,blckmaba24dw@gmail.com'
};
window.axios = axios;
window.survey = survey;
window.react = React;

const middlewares = [reduxThunk];
const store = createStore(reducers, {}, applyMiddleware(...middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
