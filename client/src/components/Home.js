import React, { Component } from 'react';
// import Materialize from 'materialize-css/dist/js/materialize.js';

class Home extends Component {
  render() {
    return (
      <div>
        <div className="section ">
          <div id="header" />
        </div>
        <div className="divider" />
        <div className="section">not promo</div>

        <div className="divider" />
        <div className="section">
          <div className="row">
            <div className="col s4 center">
              <h3>promo header</h3>
              <p>icon</p>
              <div>informaiton</div>
            </div>

            <div className="col s4 center">
              <h3>promo header</h3>
              <p>icon</p>
              <div>informaiton</div>
            </div>

            <div className="col s4 center">
              <h3>promo header</h3>
              <p>icon</p>
              <div>informaiton</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
