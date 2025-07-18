import { useState, useEffect } from 'react';
import axios from 'axios';
import Task from './Task';
import '../styles/TaskList.css';

const TaskList = ({ setView }) => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('token'),
          },
        };

        const res = await axios.get('/api/tasks', config);
        setTasks(res.data);

        const completed = res.data.filter(task => task.status === 'completed').length;
        setStats({
          total: res.data.length,
          completed,
          pending: res.data.length - completed,
        });
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchTasks();
  }, []);

  const updateTaskStatus = async (id, status) => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };

      await axios.put(`/api/tasks/${id}`, { status }, config);
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, status } : task
      ));

      const completed = tasks.filter(task => 
        task._id === id ? status === 'completed' : task.status === 'completed'
      ).length;
      
      setStats({
        total: tasks.length,
        completed,
        pending: tasks.length - completed,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const config = {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      };

      await axios.delete(`/api/tasks/${id}`, config);
      setTasks(tasks.filter(task => task._id !== id));

      const completed = tasks.filter(task => 
        task._id !== id && task.status === 'completed'
      ).length;
      
      setStats({
        total: tasks.length - 1,
        completed,
        pending: tasks.length - 1 - completed,
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="task-list-container">
      <button onClick={() => setView('welcome')} className="back-btn">
        ← Back to Dashboard
      </button>
      <div className="task-list-header">
        <h2>Your Tasks</h2>
        <div className="stats">
          <div className="stat-card">
            <h3>TOTAL TASKS</h3>
            <p>{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3>COMPLETED</h3>
            <p>{stats.completed}</p>
          </div>
          <div className="stat-card">
            <h3>PENDING</h3>
            <p>{stats.pending}</p>
          </div>
        </div>
      </div>
      <div className="tasks">
        {tasks.length === 0 ? (
          <p>No tasks found. Add a task to get started!</p>
        ) : (
          tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              updateTaskStatus={updateTaskStatus}
              deleteTask={deleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;