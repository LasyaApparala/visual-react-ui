import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="welcome-container">
      <div className="welcome-header">
        <h1>Welcome, {user?.username}</h1>
        <button onClick={logout} className="logout-btn">Logout</button>
      </div>
      
      <div className="welcome-content">
        <p className="subtitle">Ready to manage your tasks efficiently</p>
        
        <div className="action-buttons">
          <Link to="/add-task" className="action-btn primary">Add New Task</Link>
          <Link to="/view-tasks" className="action-btn secondary">View Tasks</Link>
        </div>
        
        <div className="stats-card">
          <h3>TASK MANAGEMENT</h3>
          <div className="stats-row">
            <div className="stat-item">
              <span className="stat-number">0</span>
              <span className="stat-label">TOTAL TASKS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;