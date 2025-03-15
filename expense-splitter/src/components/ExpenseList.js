import React from 'react';
import './ExpenseList.css';

function ExpenseList({ expenses, setExpenses }) {
  const [amount, setAmount] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [payer, setPayer] = React.useState('');

  const addExpense = () => {
    if (amount > 0 && desc.trim() !== '' && payer.trim() !== '') {
      setExpenses([...expenses, { id: expenses.length + 1, amount: Number(amount), desc: desc.trim(), payer: payer.trim() }]);
      setAmount(''); setDesc(''); setPayer('');
    }
  };

  const removeExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" />
      <input value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" />
      <input value={payer} onChange={(e) => setPayer(e.target.value)} placeholder="Who Paid" />
      <button onClick={addExpense}>Add</button>
      <ul>
        {expenses.map(e => (
          <li key={e.id}>${e.amount} - {e.desc} (Paid by: {e.payer}) <button onClick={() => removeExpense(e.id)}>Remove</button></li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseList;