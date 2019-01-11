import { contents } from './complex-number';
import { makeNumber, add, sub, mul, div } from './generic-arithmetic-operators';

test('numbers', () => {
  const a = makeNumber(4);
  const b = makeNumber(7);

  expect(contents(add(a, b))).toEqual(11);
  expect(contents(sub(a, b))).toEqual(-3);
  expect(contents(mul(a, b))).toEqual(28);
  expect(contents(div(a, b))).toBeCloseTo(0.57);
});
