import React from 'react';

const RegisterForm = ({ handleChange, handleSubmit, user }) => {
  return (
    // Labels or not labels? I prefer to have them as a user,
    // but there's no label-less site in my portfolio so far...
    <form onSubmit={ handleSubmit }>
      <div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={ handleChange }
          value={ user.username }
        />
      </div>
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
      <div>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Your Password"
          onChange={ handleChange }
          value={ user.passwordConfirmation }
        />
      </div>

      <button>Register</button>
    </form>
  );
};

export default RegisterForm;
