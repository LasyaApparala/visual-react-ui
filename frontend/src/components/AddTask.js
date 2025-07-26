import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { taskAPI } from '../services/api';

const AddTask = ({ user }) => {
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!taskData.title.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Remove user field - it will be set by the backend using the auth token
      const response = await taskAPI.createTask({
        title: taskData.title.trim(),
        description: taskData.description.trim()
        // Removed: status: 'pending', user: user._id
      });

      if (response.status === 201) {
        setSuccess(true);
        setTaskData({ title: '', description: '' });
        setTimeout(() => navigate('/view-tasks'), 1500);
      }
    } catch (error) {
      console.error('Task creation error:', error);
      setError(error.response?.data?.message || 'Failed to create task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add-task-container">
      <div className="page-header">
        <button 
          className="back-btn" 
          onClick={() => navigate('/welcome')}
          disabled={loading}
        >
          <i className="fas fa-arrow-left"></i>
          Back to Dashboard
        </button>
        <h1>
          <i className="fas fa-plus-circle"></i>
          Add New Task
        </h1>
      </div>

      <div className="add-task-card">
        <div className="card-header">
          <div className="user-info">
            <span>Creating task for: <strong>{user?.username}</strong></span>
          </div>
        </div>

        {success && (
          <div className="success-message">
            <i className="fas fa-check-circle"></i>
            Task created successfully! Redirecting...
          </div>
        )}

        {error && (
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">
              <i className="fas fa-heading"></i>
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter task title..."
              value={taskData.title}
              onChange={handleChange}
              maxLength={100}
              required
              disabled={loading}
            />
            <small>{taskData.title.length}/100 characters</small>
          </div>

          <div className="form-group">
            <label htmlFor="description">
              <i className="fas fa-align-left"></i>
              Task Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Describe your task in detail..."
              value={taskData.description}
              onChange={handleChange}
              maxLength={500}
              rows={6}
              disabled={loading}
            ></textarea>
            <small>{taskData.description.length}/500 characters</small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn secondary"
              onClick={() => navigate('/welcome')}
              disabled={loading}
            >
              <i className="fas fa-times"></i>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn primary"
              disabled={loading || !taskData.title.trim()}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-plus"></i>
                  Add Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;