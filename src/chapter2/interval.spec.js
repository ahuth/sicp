import {
  makeInterval,
  lowerBound,
  upperBound,
  intAdd,
  intMul,
  intDiv,
  intSub,
  intWidth,
  makeIntervalPercent,
  intCenter,
  intPercent,
} from './interval';

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
