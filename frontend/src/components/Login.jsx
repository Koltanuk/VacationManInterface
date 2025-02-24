import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authString = btoa(`${username}:${password}`);
    axios.defaults.headers.common['Authorization'] = `Basic ${authString}`;
    try {
      // First, call the endpoint to get current user data
      const { data: userData } = await axios.get('/api/users/me');
      setUser(userData);
      setError('');
      navigate('/'); // Navigate to the home page (or whichever page you choose)
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials');
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'inline-block' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
      </form>
    </div>
  );
};

export default Login;
