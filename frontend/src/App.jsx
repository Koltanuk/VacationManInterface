import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Requester from './components/Requester';
import Validator from './components/Validator';
import AuthContext from './context/AuthContext';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/requester" element={<Requester />} />
          <Route path="/validator" element={<Validator />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;