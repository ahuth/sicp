import { car, cdr } from './pair';
import { isEmpty, list } from './list';

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
