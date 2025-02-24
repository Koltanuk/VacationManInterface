import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const HomePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '3rem' }}>
      <h1 style={{ color: '#2c3e50' }}>Vacation Manager</h1>
      {user ? (
        <div style={{ marginTop: '2rem' }}>
          <h3>Welcome, {user.username}!</h3>
          <div style={{ margin: '1rem' }}>
            {user.role === 'REQUESTER' && (
              <Link to="/requester">
                <button style={{ marginRight: '1rem', padding: '1rem 2rem' }}>Request Vacation</button>
              </Link>
            )}
            {user.role === 'VALIDATOR' && (
              <Link to="/validator">
                <button style={{ marginRight: '1rem', padding: '1rem 2rem' }}>Validate Requests</button>
              </Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                padding: '1rem 2rem',
                backgroundColor: '#e74c3c',
                color: '#fff',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <Link to="/login">
            <button style={{ padding: '1rem 2rem' }}>Login</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
