export function makeAccount(balance) {
  function withdraw(amount) {
    if (balance < amount) {
      throw new Error('Insufficient funds');
    }
    balance = balance - amount;
    return balance;
  }

  function deposit(amount) {
    balance = balance + amount;
    return balance;
  }

  return function (message) {
    switch (message) {
      case 'withdraw':
        return withdraw;
      case 'deposit':
        return deposit;
      default:
        throw new Error(`Unknown account request - ${message}`);
    }
  }
}
