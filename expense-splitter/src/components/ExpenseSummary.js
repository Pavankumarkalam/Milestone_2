import React, { useState } from 'react';
import CalculationService from '../services/CalculationService';
import './ExpenseSummary.css';

function ExpenseSummary({ friends, expenses }) {
  const [splitMethod, setSplitMethod] = useState('equal'); // 'equal' or 'custom'
  const [customSplits, setCustomSplits] = useState({}); // e.g., { 'Pawan': 0.5, 'Suman': 0.5 }

  // Calculate total expenses
  const totalExpenses = CalculationService.getTotal(expenses);

  // Handle custom split input
  const handleCustomSplitChange = (friend, value) => {
    setCustomSplits({ ...customSplits, [friend]: Number(value) || 0 });
  };

  // Calculate balances
  const calculateBalances = () => {
    if (splitMethod === 'equal' && friends.length > 0) {
      const share = totalExpenses / friends.length;
      return friends.reduce((balances, friend) => {
        balances[friend.name] = -share; // Everyone owes their share initially
        return balances;
      }, {});
    } else if (splitMethod === 'custom' && Object.values(customSplits).reduce((a, b) => a + b, 0) === 1) {
      return friends.reduce((balances, friend) => {
        const share = totalExpenses * (customSplits[friend.name] || 0);
        balances[friend.name] = -share;
        return balances;
      }, {});
    }
    return {};
  };

  // Adjust balances based on who paid
  const balances = calculateBalances();
  expenses.forEach(expense => {
    balances[expense.payer] = (balances[expense.payer] || 0) + Number(expense.amount);
  });

  // Format balances for display
  const formattedBalances = Object.entries(balances).map(([name, amount]) => ({
    name,
    amount: amount.toFixed(2),
    owes: amount < 0,
  }));

  return (
    <div className="expense-summary">
      <h2>Expense Summary</h2>
      <p>Total Expenses: ₹{totalExpenses.toFixed(2)}</p>
      <div>
        <label>Split Method: </label>
        <select value={splitMethod} onChange={(e) => setSplitMethod(e.target.value)}>
          <option value="equal">Equal Split</option>
          <option value="custom">Custom Split</option>
        </select>
      </div>
      {splitMethod === 'custom' && (
        <div>
          {friends.map(friend => (
            <div key={friend.id}>
              <label>{friend.name}: </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={customSplits[friend.name] || 0}
                onChange={(e) => handleCustomSplitChange(friend.name, e.target.value)}
                placeholder="Percentage (0-1)"
              />
            </div>
          ))}
          <p>Total must equal 1 (100%).</p>
        </div>
      )}
      <h3>Balances</h3>
      <ul>
        {formattedBalances.map(({ name, amount, owes }) => (
          <li key={name}>
            {name}: {owes ? 'Owes ₹' : 'Gets ₹'}{Math.abs(amount)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseSummary;