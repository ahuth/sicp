import { cons, car, cdr, isAtom } from './pair';
import {
  list,
  nth,
  last,
  toString,
  isEmpty,
  squareList,
  mapCar,
  append,
  reverse,
  deepReverse,
  fringe,
  equal,
  every,
} from './list';

test('lists', () => {
  const l = list(2, 4, 6, 8);

  expect(car(l)).toEqual(2);
  expect(car(cdr(l))).toEqual(4);
  expect(car(cdr(cdr(l)))).toEqual(6);
  expect(car(cdr(cdr(cdr(l))))).toEqual(8);

  expect(nth(l, 0)).toEqual(2);
  expect(nth(l, 1)).toEqual(4);
  expect(nth(l, 2)).toEqual(6);
  expect(nth(l, 3)).toEqual(8);

  expect(toString(l)).toEqual('(2 4 6 8)');
});

test('exercise 2.16', () => {
  const l = list(1, 3, 5, 7);
  expect(last(l)).toEqual(7);
});

test('exercise 2.17', () => {
  const l = list(1, 1, 2, 3, 5, 8, 11);
  expect(toString(reverse(l))).toEqual('(11 8 5 3 2 1 1)');
});

test('exercise 2.18', () => {
  const l = list(2, 3, 4, 5);
  const squared = squareList(l);
  expect(toString(squared)).toEqual('(4 9 16 25)');
});

test('exercise 2.20', () => {
  const a = list(9, 8, 7, 6);
  const b = mapCar(a, x => x + 1);
  expect(toString(b)).toEqual('(10 9 8 7)');
});

test('exercise 2.22', () => {
  const l = list(1, list(2, list(3, 4)));
  expect(toString(l)).toEqual('(1 (2 (3 4)))');
});

test('exercise 2.23', () => {
  const a = list(1, list(2, 3, list(5, 7), 9));
  expect(car(cdr(car(cdr(cdr(car(cdr(a)))))))).toEqual(7);

  const b = list(list(7));
  expect(car(car(b))).toEqual(7);

  const c = list(1, list(2, list(3, list(4, list(5, list(6, list(7)))))));
  expect(car(car(cdr(car(cdr(car(cdr(car(cdr(car(cdr(car(cdr(c)))))))))))))).toEqual(7);
});

test('exercise 2.24', () => {
  const x = list(1, 2, 3);
  const y = list(4, 5, 6);
  expect(toString(append(x, y))).toEqual('(1 2 3 4 5 6)');
  expect(toString(cons(x, y))).toEqual('((1 2 3) 4 5 6)');
  expect(toString(list(x, y))).toEqual('((1 2 3) (4 5 6))');
});

test('atoms and empty', () => {
  let val = list();
  expect(toString(val)).toEqual('()');
  expect(isEmpty(val)).toEqual(true);
  expect(isAtom(val)).toEqual(true);

  val = list(1, 2, 3);
  expect(toString(val)).toEqual('(1 2 3)');
  expect(isEmpty(val)).toEqual(false);
  expect(isAtom(val)).toEqual(false);

  val = 666;
  expect(isEmpty(val)).toEqual(false);
  expect(isAtom(val)).toEqual(true);
});

test('exercise 2.25', () => {
  const l = list(list(1, 2), 3, 4);
  expect(toString(l)).toEqual('((1 2) 3 4)');
  expect(toString(reverse(l))).toEqual('(4 3 (1 2))');
  expect(toString(deepReverse(l))).toEqual('(4 3 (2 1))');
});

test('exercise 2.26', () => {
  const x = cons(list(1, 2), list(3, 4));
  expect(toString(x)).toEqual('((1 2) 3 4)');
  expect(toString(fringe(x))).toEqual('(1 2 3 4)');

  const y = list(x, x);
  expect(toString(y)).toEqual('(((1 2) 3 4) ((1 2) 3 4))');
  expect(toString(fringe(y))).toEqual('(1 2 3 4 1 2 3 4)');
});

test('exercise 2.29', () => {
  expect(equal(
    list('this', 'is', 'a', 'list'),
    list('this', 'is', 'a', 'list'),
  )).toEqual(true);

  expect(equal(
    list('this', 'is', 'a', 'list'),
    list('this', list('is', 'a'), 'list'),
  )).toEqual(false);

  expect(equal(
    list('this', 'is', 'a', 'list'),
    list('this', 'is', 'no', 'list'),
  )).toEqual(false);
});

test('every', () => {
  const l = list(2, 4, 6, 8);
  expect(every(l, n => n % 2 === 0)).toEqual(true);
  expect(every(l, n => n < 5)).toEqual(false);
});
