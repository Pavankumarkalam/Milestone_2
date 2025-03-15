const CalculationService = {
  getTotal: (expenses) => expenses.reduce((sum, e) => sum + Number(e.amount), 0),
  getSplit: (total, numFriends) => total / numFriends,
};

export default CalculationService;