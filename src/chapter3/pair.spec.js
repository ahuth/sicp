import { cons, car, cdr } from './pair';

test('pairs', () => {
  const a = cons(2, 5);
  expect(car(a)).toEqual(2);
  expect(cdr(a)).toEqual(5);
});
