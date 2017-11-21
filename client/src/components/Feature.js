import React from 'react';
import $ from 'jquery';
export default function() {
  const open = () => {
    $('.tap-target').tapTarget('open');
  };
  return (
    <div>
      <a
        onClick={open}
        id="menu"
        className="waves-effect waves-light btn btn-floating"
      >
        <i className="material-icons">menu</i>
      </a>

      <div className="tap-target" data-activates="menu">
        <div className="tap-target-content">
          <h5>See the new features here</h5>
          <p>More text about how we can bring in topics</p>
        </div>
      </div>
    </div>
  );
}
