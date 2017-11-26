import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
  componentDidMount() {
    this.props.fetchSurveys();
  }
  renderContent() {
    return this.props.surveys.reverse().map(survey => {
      return (
        <div className="card blue-grey darken-1" key={survey._id}>
          <div className="card-content white-text">
            <span className="card-title">{survey.title}</span>
            <p className="right">
              Flight start: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
            <p>{survey.body}</p>
          </div>
          <div className="card-action">
            <a>Yes Voutes: {survey.yes}</a>
            <a>No Votes: {survey.no}</a>
          </div>
        </div>
      );
    });
  }
  render() {
    return <div className="section">{this.renderContent()}</div>;
  }
}

function mapStateToProps({ surveys }) {
  return { surveys };
}
export default connect(mapStateToProps, { fetchSurveys })(SurveyList);
