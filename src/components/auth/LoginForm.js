import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={ handleChange }
          value={ user.email }
          className="form-control zen-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={ handleChange }
          value={ user.password }
          className="form-control zen-input"
        />
      </div>
      <button className="btn zen-button">Login</button>
    </form>
  );
};

export default LoginForm;
