import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';
import authReducer from './authReducer';
import surveyReducer from './surveyReducer';
import toastReducer from './toastReducer';
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  survey: surveyReducer,
  toast: toastReducer
});
