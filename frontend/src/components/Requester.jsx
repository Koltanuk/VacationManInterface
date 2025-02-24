import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Requester = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitRequest = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/vacation-requests', formData);
      setRequests([...requests, response.data]);
      setError('');
    } catch (err) {
      console.error('Error submitting request:', err);
      setError('Failed to submit request.');
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/api/vacation-requests', {
          params: { userId: user.id }
        });
        setRequests(response.data);
      } catch (err) {
        console.error('Error fetching requests:', err);
      }
    };
    if (user && user.id) {
      fetchRequests();
    }
  }, [user]);

  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/"><button>Back</button></Link>
      <h2>Request Vacation</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={submitRequest}>
        <div>
          <label>Start Date: </label>
          <input type="date" name="startDate" required onChange={handleChange} />
        </div>
        <div>
          <label>End Date: </label>
          <input type="date" name="endDate" required onChange={handleChange} />
        </div>
        <div>
          <label>Reason: </label>
          <textarea name="reason" onChange={handleChange} />
        </div>
        <button type="submit">Submit Request</button>
      </form>

      <h3>Your Vacation Requests</h3>
      <ul>
        {requests.map((req) => (
          <li key={req.id}>
            {req.startDate} to {req.endDate} - {req.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requester;
