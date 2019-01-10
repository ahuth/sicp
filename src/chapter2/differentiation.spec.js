import { makeSum, makeProduct, derive } from './differentiation';
import { toString } from './list';

test('symbolic differentiation', () => {
  const e1 = makeSum('x', 3);       // x + 3
  const e2 = makeProduct('x', 'y'); // xy
  const e3 = makeProduct(e2, e1);   // xy(x + 3)

  expect(derive(e1, 'x')).toEqual(1);
  expect(derive(e2, 'x')).toEqual('y');
  expect(toString(derive(e3, 'x'))).toEqual('(+ (* x y) (* (+ x 3) y))');

  // (a * x * x) + (b * x + c)
  const foo = makeSum(
    makeProduct('a', makeProduct('x', 'x')),
    makeSum(makeProduct('b', 'x'), 'c'),
  );
  expect(toString(derive(foo, 'x'))).toEqual('(+ (* a (+ x x)) b)');
  expect(toString(derive(foo, 'a'))).toEqual('(* x x)');
  expect(toString(derive(foo, 'b'))).toEqual('x');
  expect(toString(derive(foo, 'c'))).toEqual(1);
});
