import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as a from '../actions';

import Header from './Header';
import Feature from './Feature';
import Home from './Home';
import Footer from './Footer';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/surveys" component={() => <h1>Surveys</h1>} />
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}
function mapStateToProps(state) {}

export default connect(null, a)(App);
