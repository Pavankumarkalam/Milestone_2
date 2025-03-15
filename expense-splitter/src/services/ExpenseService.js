const ExpenseService = {
  addExpense: (expenses, amount, desc, payer) => {
    if (amount > 0 && desc !== '' && payer !== '') {
      return [...expenses, { id: expenses.length + 1, amount, desc, payer }];
    }
    return expenses;
  },
  removeExpense: (expenses, id) => expenses.filter(e => e.id !== id),
};

export default ExpenseService;