import { cons, car, cdr, cadr, caddr } from './pair';

test('pairs', () => {
  const pair = cons(2, 4);
  expect(car(pair)).toEqual(2);
  expect(cdr(pair)).toEqual(4);
});

test('cadr and caddr', () => {
  const pair = cons(1, cons(2, cons(3, cons(4, null))));
  expect(cadr(pair)).toEqual(2);
  expect(caddr(pair)).toEqual(3);
});
