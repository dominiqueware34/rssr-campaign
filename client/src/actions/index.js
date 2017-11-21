import axios from 'axios';

import * as c from './constants';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  dispatch({ type: c.FETCH_USER, payload: res.data });
};
