import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user }) => {
  return (
    // Labels or not labels? I prefer to have them as a user,
    // but there's no label-less site in my portfolio so far...
    <form onSubmit={ handleSubmit }>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Your Name"
          onChange={ handleChange }
          value={ user.username }
          className="form-control zen-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          placeholder="@"
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
          placeholder="Your Password"
          onChange={ handleChange }
          value={ user.password }
          className="form-control zen-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Your Password Again"
          onChange={ handleChange }
          value={ user.passwordConfirmation }
          className="form-control zen-input"
        />
      </div>

      <button className="btn zen-button">register</button>
    </form>
  );
};

export default RegisterForm;
