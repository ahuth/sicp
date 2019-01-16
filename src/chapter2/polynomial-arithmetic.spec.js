import { add, mul } from './generic-arithmetic-operators';
import { list, toString } from './list';
import { makePolynomial, makeTerm, tagPolynomial } from './polynomial-arithmetic';

test('adding', () => {
  const p1 = tagPolynomial(makePolynomial('x', list(makeTerm(2, 1)))); // 1 * x^2

  const added = add(p1, p1); // x^2 + x^2
  expect(toString(added)).toEqual('(x (2 2))');  // 2 * x^2

  const multiplied = mul(p1, p1); // x^2 * x^2
  expect(toString(multiplied)).toEqual('(x (4 1))');  // 1 * x^4
});
