export function newWithdraw(balance) {
  return function (amount) {
    if (balance < amount) {
      throw new Error('Insufficient funds');
    }

    balance = balance - amount;
    return balance;
  }
}
