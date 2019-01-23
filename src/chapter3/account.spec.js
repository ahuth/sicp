import { makeAccount } from './account';

test('accounts', () => {
  const acc1 = makeAccount(100);
  const acc2 = makeAccount(100);

  expect(acc1('withdraw')(50)).toEqual(50);
  expect(acc2('withdraw')(25)).toEqual(75);

  expect(() => acc1('withdraw')(60)).toThrowError('Insufficient funds');
  expect(acc2('withdraw')(60)).toEqual(15);

  expect(acc1('deposit')(40)).toEqual(90);
  expect(acc1('withdraw')(60)).toEqual(30);
});
