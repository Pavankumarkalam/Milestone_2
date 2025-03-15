import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Expense Splitter</h1>
      <p>Go to:</p>
      <Link to="/friends">Friends</Link> | 
      <Link to="/expenses">Expenses</Link> | 
      <Link to="/summary">Summary</Link>
    </div>
  );
}

export default Dashboard;