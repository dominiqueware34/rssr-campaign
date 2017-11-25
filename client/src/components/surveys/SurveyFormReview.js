import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import _ from 'lodash';

import * as a from '../../actions';
import FIELDS from './formFields';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
  console.log(formValues);
  const renderContent = () => {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <div key={label}>
          <label htmlFor={label}> {label}</label>
          <div>{formValues[name]}</div>
        </div>
      );
    });
  };
  return (
    <div className="container">
      <h5>Please confirm your entries</h5>
      <div className="row">
        <div className="col s8">{renderContent()}</div>
      </div>
      <div className="row">
        <div className="col s12">
          <button
            className="yellow darken-3 btn-flat left white-text"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="green darke btn-flat right white-text"
            onClick={() => submitSurvey(formValues, history)}
          >
            Send Survey
            <i className="material-icons right">email</i>
          </button>
        </div>
      </div>
    </div>
  );
};
function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, a)(withRouter(SurveyReview));
