import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';
import './ViewTasks.css';

const ViewTasks = ({ user }) => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  // Calculate stats from tasks array instead of separate API call
  useEffect(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.status === 'completed').length;
    const pending = tasks.filter(task => task.status === 'pending').length;
    
    setTaskStats({ total, completed, pending });
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskAPI.getTasks();
      setTasks(response.data || []);
      setError('');
    } catch (error) {
      setError('Failed to fetch tasks. Please try again.');
      console.error('Error fetching tasks:', error);
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (taskId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    
    try {
      await taskAPI.updateTaskStatus(taskId, newStatus);
      setTasks(tasks.map(task => 
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      setError('Failed to update task status');
      console.error('Error updating task status:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await taskAPI.deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      setError('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="view-tasks-container">
      <div className="page-header">
        <button className="back-btn" onClick={() => navigate('/welcome')}>
          <i className="fas fa-arrow-left"></i>
          Back to Dashboard
        </button>
        <h1>
          <i className="fas fa-tasks"></i>
          My Tasks
        </h1>
      </div>

      {error && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          {error}
        </div>
      )}

      <div className="tasks-controls">
        <div className="filter-buttons">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <i className="fas fa-list"></i>
            All ({taskStats.total})
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            <i className="fas fa-clock"></i>
            Pending ({taskStats.pending})
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            <i className="fas fa-check-circle"></i>
            Completed ({taskStats.completed})
          </button>
        </div>

        <button 
          className="add-task-btn"
          onClick={() => navigate('/add-task')}
        >
          <i className="fas fa-plus"></i>
          Add New Task
        </button>
      </div>

      <div className="tasks-content">
        {loading ? (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-inbox"></i>
            <h3>No tasks found</h3>
            <p>
              {filter === 'all' 
                ? "You don't have any tasks yet." 
                : `No ${filter} tasks found.`}
            </p>
            <button 
              className="btn primary"
              onClick={() => navigate('/add-task')}
            >
              <i className="fas fa-plus"></i>
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="tasks-grid">
            {filteredTasks.map(task => (
              <div key={task._id} className={`task-card ${task.status}`}>
                <div className="task-header">
                  <h3 className="task-title">{task.title}</h3>
                  <div className="task-actions">
                    <button
                      className={`status-btn ${task.status}`}
                      onClick={() => handleStatusToggle(task._id, task.status)}
                      title={`Mark as ${task.status === 'completed' ? 'pending' : 'completed'}`}
                    >
                      <i className={`fas ${task.status === 'completed' ? 'fa-undo' : 'fa-check'}`}></i>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTask(task._id)}
                      title="Delete task"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>

                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}

                <div className="task-footer">
                  <span className={`task-status status-${task.status}`}>
                    <i className={`fas ${task.status === 'completed' ? 'fa-check-circle' : 'fa-clock'}`}></i>
                    {task.status === 'completed' ? 'Completed' : 'Pending'}
                  </span>
                  <span className="task-date">
                    <i className="fas fa-calendar-alt"></i>
                    {formatDate(task.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewTasks;