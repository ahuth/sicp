import {
  cons, car, cdr,
  makeRat, addRat, printRat,
  makePoint, getX, getY,
  makeSegment, startPoint, endPoint, midPoint,
  makeInterval, upperBound, lowerBound, intAdd, intMul, intDiv, intSub,
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

test('exercise 2.6', () => {
  const a = makeInterval(1.5, 3.4);
  const b = makeInterval(2.7, 5.1);
  expect(lowerBound(a)).toEqual(1.5);
  expect(upperBound(a)).toEqual(3.4);

  const added = intAdd(a, b);
  expect(lowerBound(added)).toEqual(4.2);
  expect(upperBound(added)).toEqual(8.5);

  const multiplied = intMul(a, b);
  expect(lowerBound(multiplied)).toBeCloseTo(4.05);
  expect(upperBound(multiplied)).toBeCloseTo(17.34);

  const divided = intDiv(a, b);
  expect(lowerBound(divided)).toBeCloseTo(0.29);
  expect(upperBound(divided)).toBeCloseTo(1.26);
});

test('exercise 2.7', () => {
  const a = makeInterval(4.1, 3.8);
  const b = makeInterval(1.5, 5.1);
  const subtracted = intSub(a, b);
  expect(lowerBound(subtracted)).toBeCloseTo(2.6);
  expect(upperBound(subtracted)).toBeCloseTo(-1.3);
});
