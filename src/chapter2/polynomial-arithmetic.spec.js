import { add, mul } from './generic-arithmetic-operators';
import { contents } from './data-directed-utils';
import { list, toString } from './list';
import { makePolynomial, makeTerm, tagPolynomial } from './polynomial-arithmetic';

test('adding', () => {
  const p1 = tagPolynomial(makePolynomial('x', list(makeTerm(2, 1)))); // x^2

  const p2 = add(p1, p1); // x^2 + x^2
  expect(toString(contents(p2))).toEqual('(x (2 2))');  // 2x^2

  const p3 = mul(p1, p1); // x^2 * x^2
  expect(toString(contents(p3))).toEqual('(x (4 1))');  // x^4

  const p4 = add(p2, p3); // (2x^2) + (x^4)
  expect(toString(contents(p4))).toEqual('(x (4 1) (2 2))'); // x^4 + 2x^2
});
