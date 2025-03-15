import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import FriendList from './components/FriendList';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import './App.css';

function App() {
  const [friends, setFriends] = useState([]);
  const [expenses, setExpenses] = useState([]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/friends" element={<FriendList friends={friends} setFriends={setFriends} />} />
          <Route path="/expenses" element={<ExpenseList expenses={expenses} setExpenses={setExpenses} />} />
          <Route path="/summary" element={<ExpenseSummary friends={friends} expenses={expenses} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;