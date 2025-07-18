import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">Task Manager</div>
        <h2>Welcome back!</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>EMAIL</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              placeholder="Enter your email"
            />
          </div>
          <div className="input-group">
            <label>PASSWORD</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="login-btn">LOGIN →</button>
        </form>
        <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;