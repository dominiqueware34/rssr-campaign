import React from 'react';
import { Link } from 'react-router-dom';
// import * as a from '../actions';

const Dashboard = () => {
  return (
    <div style={{ minHeigh: '700px' }}>
      <h1>SURVEY DASHBOARD</h1>
      <div className="fixed-action-btn">
        <Link to="/surveys/new" className="btn-floating btn-large red">
          <i className="large material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
