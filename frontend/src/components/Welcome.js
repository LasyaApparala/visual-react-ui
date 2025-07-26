import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';

const Welcome = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTaskStats();
  }, []);

  const fetchTaskStats = async () => {
    try {
      // Try to get stats from the API first
      const response = await taskAPI.getTaskStats();
      setTaskStats(response.data);
    } catch (error) {
      console.error('Error fetching task stats from API, falling back to tasks list:', error);
      // Fallback: get tasks and calculate stats manually
      try {
        const tasksResponse = await taskAPI.getTasks();
        const tasks = tasksResponse.data || [];
        const total = tasks.length;
        const completed = tasks.filter(task => task.status === 'completed').length;
        const pending = tasks.filter(task => task.status === 'pending').length;
        setTaskStats({ total, completed, pending });
      } catch (fallbackError) {
        console.error('Error fetching tasks for stats:', fallbackError);
        // Keep default stats (all zeros)
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <div className="user-info">
          <div className="user-avatar">
            <i className="fas fa-user"></i>
          </div>
          <div className="user-details">
            <h1>Welcome back, {user?.username}!</h1>
            <p>Ready to manage your tasks?</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <i className="fas fa-tasks"></i>
          </div>
          <div className="stat-content">
            <h3>{loading ? '...' : taskStats.total}</h3>
            <p>Total Tasks</p>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">
            <i className="fas fa-check-circle"></i>
          </div>
          <div className="stat-content">
            <h3>{loading ? '...' : taskStats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <i className="fas fa-clock"></i>
          </div>
          <div className="stat-content">
            <h3>{loading ? '...' : taskStats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button 
          className="action-btn primary"
          onClick={() => navigate('/add-task')}
        >
          <i className="fas fa-plus"></i>
          Add New Task
        </button>

        <button 
          className="action-btn secondary"
          onClick={() => navigate('/view-tasks')}
        >
          <i className="fas fa-list"></i>
          View All Tasks
        </button>
      </div>

      <div className="welcome-footer">
        <div className="feature-grid">
          <div className="feature-item">
            <i className="fas fa-lightbulb"></i>
            <h4>Stay Organized</h4>
            <p>Keep track of all your tasks in one place</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-chart-line"></i>
            <h4>Track Progress</h4>
            <p>Monitor your productivity and completion rates</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-mobile-alt"></i>
            <h4>Access Anywhere</h4>
            <p>Your tasks sync across all your devices</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;