import React from 'react';
import '../styles/Welcome.css';
import { useAuth } from '../context/AuthContext';

const Welcome = ({ user, setView, logout }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Welcome, {user.username}</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </div>
      <div className="welcome-content">
        <h2>Ready to manage your tasks efficiently</h2>
        <div className="welcome-buttons">
          <button onClick={() => setView('add')} className="btn">
            Add New Task
          </button>
          <button onClick={() => setView('view')} className="btn">
            View Tasks
          </button>
        </div>
        <div className="stats">
          <div className="stat-card">
            <h3>TOTAL TASKS</h3>
            <p>0</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;