import { newWithdraw } from './withdraw';

test('withdrawing', () => {
  const w1 = newWithdraw(100);
  const w2 = newWithdraw(100);

  expect(w1(0)).toEqual(100);
  expect(w1(0)).toEqual(100);

  expect(w1(25)).toEqual(75);
  expect(w2(75)).toEqual(25);

  expect(w1(50)).toEqual(25);
  expect(w2(10)).toEqual(15);

  expect(() => w1(75)).toThrowError('Insufficient funds');
  expect(w2(7)).toEqual(8);
});
