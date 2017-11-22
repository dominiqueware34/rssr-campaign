import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';
import * as a from '../actions';

class Header extends Component {
  renderContent() {
    const { auth } = this.props;
    console.log(auth);
    switch (auth) {
      case null:
        return false;
      case false:
        return (
          <li>
            <a href="/auth/twitter">Login with Twitter</a>
          </li>
        );
      default:
        return [
          <li key="avatar" style={{ margin: '0 10px' }}>
            <img
              className="circle responsive-img"
              src={auth.twitterAvatar}
              alt=""
            />
          </li>,
          <li key="Payments">
            <Payments />
          </li>,
          <li key="credits" style={{ margin: '0 10px' }}>
            Credits: {auth.credits}
          </li>,
          <li key="logout">
            <a href="/api/logout">Logout</a>
          </li>
        ];
    }
  }

  render() {
    const { auth } = this.props;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={auth ? '/surveys' : '/'} className="left brand-logo">
            RSSR-Campaign Launcher
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}
export default connect(mapStateToProps, a)(Header);
