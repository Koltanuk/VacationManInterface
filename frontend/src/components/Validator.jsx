import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Validator = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('ALL'); 
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    try {
      let params = {};
      if (filter !== 'ALL') {
        params.status = filter;
      }
      const response = await axios.get('/api/vacation-requests', { params });
      setRequests(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to load requests.');
    }
  };

  const updateRequest = async (id, status) => {
    let comments = '';
    if (status === 'REJECTED') {
      comments = prompt('Enter rejection comment:') || '';
    }
    try {
      await axios.put(`/api/vacation-requests/${id}`, { status, comments });
      fetchRequests();
    } catch (err) {
      console.error('Error updating request:', err);
      setError('Failed to update request.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/"><button>Back</button></Link>
      <h2 style={{ textAlign: 'center', color: '#2c3e50' }}>Vacation Request Dashboard</h2>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div style={{ margin: '1rem 0', textAlign: 'center' }}>
        <label style={{ marginRight: '0.5rem' }}>Filter by Status:</label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="ALL">All</option>
          <option value="PENDING">Pending</option>
          <option value="APPROVED">Approved</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ backgroundColor: '#34495e', color: '#fff' }}>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>ID</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Requester</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Start Date</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>End Date</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Reason</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Comments</th>
            <th style={{ padding: '0.5rem', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id} style={{ textAlign: 'center' }}>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{req.id}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {req.requester?.name || req.requester?.username || 'Unknown'}
                </td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{req.startDate}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{req.endDate}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{req.reason || '-'}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{req.status}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>{req.comments || '-'}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ddd' }}>
                  {req.status === 'PENDING' ? (
                    <>
                      <button style={{ marginRight: '0.5rem' }} onClick={() => updateRequest(req.id, 'APPROVED')}>Approve</button>
                      <button onClick={() => updateRequest(req.id, 'REJECTED')}>Reject</button>
                    </>
                  ) : (
                    'N/A'
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: 'center', padding: '1rem' }}>No requests found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Validator;
