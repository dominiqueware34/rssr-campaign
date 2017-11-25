import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import * as a from '../../actions';
import validateEmails from '../../utils/validateEmails';
import FIELDS from './formFields';

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }

  render() {
    return (
      <div className="container">
        <div className="section">
          <h2 className="center-align">Create a new survey</h2>
        </div>
        <form
          name="surveyForm"
          onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
          className="col s12"
        >
          <div className="row">
            {this.renderFields()}
            <div className="input-field col s8">
              <button className="teal btn-flat right white-text">
                Next
                <i className="material-icons right">done</i>
              </button>
              <Link to="/surveys" className="red btn-flat left white-text">
                Cancel
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
function validate(values) {
  const errors = {};
  errors.recipients = validateEmails(values.recipients || '');
  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = `You must provide a value`;
    }
  });

  return errors;
}
export default reduxForm({
  form: 'surveyForm',
  validate: validate,
  destroyOnUnmount: false
})(SurveyForm);
