import React from 'react';

const LoginForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <form onSubmit={ handleSubmit }>
      <div>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={ handleChange }
          value={ user.email }
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={ handleChange }
          value={ user.password }
        />
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
