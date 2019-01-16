import { add, mul } from './generic-arithmetic-operators';
import { list, toString } from './list';
import { makePolynomial, makeTerm, tagPolynomial } from './polynomial-arithmetic';

test('adding', () => {
  const p1 = tagPolynomial(makePolynomial('x', list(makeTerm(2, 1)))); // 1 * x^2

  const p2 = add(p1, p1); // x^2 + x^2
  expect(toString(p2)).toEqual('(x (2 2))');  // 2 * x^2

  const p3 = mul(p1, p1); // x^2 * x^2
  expect(toString(p3)).toEqual('(x (4 1))');  // 1 * x^4

  const p4 = add(tagPolynomial(p2), tagPolynomial(p3)); // (2x^2 + x^4)
  expect(toString(p4)).toEqual('(x (4 1) (2 2))');
});
