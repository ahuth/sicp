import {
  cons,
  car,
  cdr,
  makeRat,
  addRat,
  printRat,
  makePoint,
  getX,
  getY,
  makeSegment,
  startPoint,
  endPoint,
  midPoint,
} from './chapter2';

test('pairs', () => {
  const pair = cons(2, 4);
  expect(car(pair)).toEqual(2);
  expect(cdr(pair)).toEqual(4);
});

test('exercise 2.1', () => {
  const rat1 = makeRat(2, 3);
  const rat2 = makeRat(6, 8);
  const rat3 = makeRat(5, -15);
  expect(printRat(rat1)).toEqual('2/3');
  expect(printRat(rat2)).toEqual('3/4');
  expect(printRat(rat3)).toEqual('-1/3');

  const added = addRat(rat1, rat2);
  expect(printRat(added)).toEqual('17/12');
});

test('exercise 2.2', () => {
  const a = makePoint(2, 3);
  const b = makePoint(8, 4);
  const s = makeSegment(a, b);
  const m = midPoint(s);

  expect(startPoint(s)).toEqual(a);
  expect(endPoint(s)).toEqual(b);
  expect(getX(m)).toEqual(5);
  expect(getY(m)).toEqual(3.5);
});
