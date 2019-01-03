import {
  cons, car, cdr,
  makeRat, addRat, printRat,
  makePoint, getX, getY,
  makeSegment, startPoint, endPoint, midPoint,
  makeInterval, upperBound, lowerBound, intAdd, intMul, intDiv, intSub, intWidth, makeIntervalPercent, intCenter, intPercent,
  list, nth, last, reverse, toString, squareList, mapCar, append, isAtom, isEmpty, deepReverse, fringe, equal,
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

test('exercise 2.8', () => {
  const a = makeInterval(1.5, 3.4);
  const b = makeInterval(2.7, 5.1);

  const widthA = intWidth(a);
  const widthB = intWidth(b);
  expect(widthA).toBeCloseTo(1.9);
  expect(widthB).toBeCloseTo(2.4);

  const added = intAdd(a, b);
  const widthAdded = intWidth(added);
  expect(widthAdded).toBeCloseTo(widthA + widthB);

  const multiplied = intMul(a, b);
  const widthMultiplied = intWidth(multiplied);
  expect(widthMultiplied).not.toBeCloseTo(widthA + widthB);
  expect(widthMultiplied).not.toBeCloseTo(widthA * widthB);
});

test('exercise 2.11', () => {
  const a = makeIntervalPercent(5, 0.04);
  const b = makeInterval(1.5, 5.1);

  expect(intCenter(a)).toBeCloseTo(5);
  expect(intPercent(a)).toBeCloseTo(0.04);
  expect(lowerBound(a)).toBeCloseTo(4.8);
  expect(upperBound(a)).toBeCloseTo(5.2);

  expect(intCenter(b)).toBeCloseTo(3.3);
  expect(intPercent(b)).toBeCloseTo(0.545);
  expect(lowerBound(b)).toBeCloseTo(1.5);
  expect(upperBound(b)).toBeCloseTo(5.1);
});

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
});
