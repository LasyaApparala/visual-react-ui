import { Link, useLocation } from 'react-router-dom';
import '../styles/AuthTabs.css';

const AuthTabs = () => {
  const { pathname } = useLocation();

  return (
    <div className="auth-tabs">
      <Link 
        to="/login" 
        className={`tab ${pathname === '/login' ? 'active' : ''}`}
      >
        Login
      </Link>
      <Link 
        to="/signup" 
        className={`tab ${pathname === '/signup' ? 'active' : ''}`}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthTabs;