import { car, cdr } from './pair';
import { every, isEmpty, list, map } from './list';

test('lists', () => {
  const l = list(2, 4, 6, 8);
  expect(isEmpty(l)).toEqual(false);

  expect(car(l)).toEqual(2);
  expect(car(cdr(l))).toEqual(4);
  expect(car(cdr(cdr(l)))).toEqual(6);
  expect(car(cdr(cdr(cdr(l))))).toEqual(8);
  expect(cdr(cdr(cdr(cdr(l))))).toEqual(null);
});

test('empty lists', () => {
  const l = list();
  expect(isEmpty(l)).toEqual(true);
});

test('map', () => {
  const a = list(3, 2, 1);
  const b = map(a, x => x + 1);
  expect(car(b)).toEqual(4);
  expect(car(cdr(b))).toEqual(3);
  expect(car(cdr(cdr(b)))).toEqual(2);
});

test('every', () => {
  const l = list(2, 4, 6);
  expect(every(l, x => x <= 6)).toEqual(true);
  expect(every(l, x => x < 6)).toEqual(false);
});
