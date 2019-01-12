import {
  makeRat,
  printRat,
  addRat,
  subRat,
  mulRat,
  divRat,
  equRat,
  zeroRat,
} from './rational-number';

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

test('subtracting', () => {
  const a = makeRat(3, 4);
  const b = makeRat(1, 4);
  expect(printRat(subRat(a, b))).toEqual('1/2');
});

test('multiplying', () => {
  const a = makeRat(3, 4);
  const b = makeRat(1, 4);
  expect(printRat(mulRat(a, b))).toEqual('3/16');
});

test('dividing', () => {
  const a = makeRat(3, 4);
  const b = makeRat(1, 4);
  expect(printRat(divRat(a, b))).toEqual('3/1');
});

test('equality', () => {
  expect(equRat(
    makeRat(1, 2),
    makeRat(1, 2),
  )).toEqual(true);

  expect(equRat(
    makeRat(1, 2),
    makeRat(2, 4),
  )).toEqual(true);

  expect(equRat(
    makeRat(1, 2),
    makeRat(1, 3),
  )).toEqual(false);
});

test('zero', () => {
  expect(zeroRat(makeRat(0, 1))).toEqual(true);
  expect(zeroRat(makeRat(0, 2))).toEqual(true);
  expect(zeroRat(makeRat(0, 3))).toEqual(true);

  expect(zeroRat(makeRat(1, 1))).toEqual(false);
  expect(zeroRat(makeRat(1, 2))).toEqual(false);
  expect(zeroRat(makeRat(1, 3))).toEqual(false);
});
