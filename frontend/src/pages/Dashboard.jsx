import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Welcome from '../components/Welcome';
import AddTask from '../components/AddTask';
import TaskList from '../components/TaskList';
import '../styles/App.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [view, setView] = useState('welcome');
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="dashboard">
      {view === 'welcome' && <Welcome user={user} setView={setView} logout={logout} />}
      {view === 'add' && <AddTask setView={setView} />}
      {view === 'view' && <TaskList setView={setView} />}
    </div>
  );
};

export default Dashboard;