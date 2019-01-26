import { cons, car, cdr, setCar, setCdr } from './pair';

test('pairs', () => {
  const a = cons(2, 5);
  expect(car(a)).toEqual(2);
  expect(cdr(a)).toEqual(5);
});

test('mutating', () => {
  const p = cons(1, 2);
  expect(car(p)).toEqual(1);
  expect(cdr(p)).toEqual(2);

  setCar(p, 5);
  expect(car(p)).toEqual(5);
  expect(cdr(p)).toEqual(2);

  setCdr(p, 3);
  expect(car(p)).toEqual(5);
  expect(cdr(p)).toEqual(3);
});

test('Exercise 3.20', () => {
  const x = cons(1, 2);
  const z = cons(x, x);
  setCar(z, 17);
  expect(car(z)).toEqual(17);
});
