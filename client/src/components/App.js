import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as a from '../actions';

import Materialize from 'materialize-css/dist/js/materialize.js';
import Header from './Header';
import SurveyNew from './surveys/SurveyNew';
import Dashboard from './Dashboard';
import Home from './Home';
import NotFound from './NotFound';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    if (this.props.toast) {
      Materialize.toast(this.props.toast, 4000);
    }
    return (
      <div>
        <BrowserRouter>
          <main>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/surveys" component={Dashboard} />
              <Route exact path="/surveys/new" component={SurveyNew} />
              <Route component={NotFound} />
            </Switch>
          </main>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    toast: state.toast
  };
}

export default connect(mapStateToProps, a)(App);
