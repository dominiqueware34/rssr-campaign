import React from 'react';

export default ({ input, label, meta: { touched, error } }) => {
  return (
    <div className="input-field col s8">
      <input
        {...input}
        style={{ marginBottom: '5px' }}
        id="first_name"
        type="text"
        className="validate"
      />
      <label htmlFor={label}>{label}</label>
      {touched && (
        <div className="red-text" style={{ marginBottom: '20px' }}>
          {error}
        </div>
      )}
    </div>
  );
};
