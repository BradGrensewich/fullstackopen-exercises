import { useState } from 'react';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async (event) => {
    event.preventDefault();
    const success = await onLogin(username, password);
    if (success) {
      setUsername('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={login}>
      <h2>Login to application</h2>
      <div>
        username
        <input
          type='text'
          value={username}
          name='UserName'
          onChange={({ target }) => {
            setUsername(target.value);
          }}
          data-testid='username'></input>
      </div>
      <div>
        password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => {
            setPassword(target.value);
          }}
          data-testid='password'></input>
      </div>
      <button type='submit'>login</button>
    </form>
  );
};

export default LoginForm;
