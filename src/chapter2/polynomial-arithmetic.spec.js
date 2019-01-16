import { add, mul } from './generic-arithmetic-operators';
import { list } from './list';
import { makePolynomial } from './polynomial-arithmetic';

test('adding', () => {
  const p1 = makePolynomial('x', list(2, 1));
  add(p1, p1);
});
