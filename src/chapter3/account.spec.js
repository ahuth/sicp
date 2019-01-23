import makeAccount from './account';

test('accounts', () => {
  const acc1 = makeAccount(100, 'pass1');
  const acc2 = makeAccount(100, 'pass2');

  expect(acc1('withdraw', 'pass1')(50)).toEqual(50);
  expect(acc2('withdraw', 'pass2')(25)).toEqual(75);

  expect(() => acc1('withdraw', 'pass1')(60)).toThrowError('Insufficient funds');
  expect(acc2('withdraw', 'pass2')(60)).toEqual(15);

  expect(acc1('deposit', 'pass1')(40)).toEqual(90);
  expect(acc1('withdraw', 'pass1')(60)).toEqual(30);

  expect(() => acc1('withdraw', 'wrong-password')).toThrowError('Incorrect password');
});
