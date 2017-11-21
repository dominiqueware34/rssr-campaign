import * as c from '../actions/constants';

export default function(state = null, action) {
  switch (action.type) {
    case c.FETCH_USER:
      return action.payload || false;
    default:
      return state;
  }
}
