import * as c from '../actions/constants';
export default function(state = '', action) {
  switch (action.type) {
    case c.SEND_TOAST:
      return action.payload;
    default:
      return '';
  }
}
