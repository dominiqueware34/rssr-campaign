import * as c from '../actions/constants';
export default function(state = [], action) {
  switch (action.type) {
    case c.GET_SURVEYS:
      return action.payload;
      break;
    default:
      return state;
  }
}
