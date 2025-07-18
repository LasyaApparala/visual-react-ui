import React from 'react';
import { Link } from 'react-router-dom';
import AuthTabs from '../components/AuthTabs'; // Add this import
import '../styles/Auth.css';

const Signup = () => {
  // ... your existing signup code
  return (
    <div className="auth-container">
      <AuthTabs /> {/* This was causing the error */}
      {/* Rest of your signup form */}
    </div>
  );
};

export default Signup;