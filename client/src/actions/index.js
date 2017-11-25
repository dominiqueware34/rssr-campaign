import axios from 'axios';

import * as c from './constants';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: c.FETCH_USER, payload: res.data });
};

export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  dispatch({
    type: c.FETCH_USER,
    payload: res.data
  });
  dispatch({
    type: c.SEND_TOAST,
    payload: 'Credits added!'
  });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post('/api/surveys', values);
  dispatch({
    type: c.FETCH_USER,
    payload: res.data
  });
  dispatch({
    type: c.SEND_TOAST,
    payload: 'Survey was sent succesfully'
  });
  history.push('/surveys');
};

export const updateToast = (message = 'standard message') => {
  return dispatch => {
    dispatch({
      type: c.SEND_TOAST,
      payload: message
    });
  };
};
