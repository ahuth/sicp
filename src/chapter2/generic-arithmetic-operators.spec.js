import { contents, makeRectangular, realPart, imagPart } from './complex-number';
import { add, sub, mul, div, makeComplex } from './generic-arithmetic-operators';

test('numbers', () => {
  const a = 4;
  const b = 7;

  expect(contents(add(a, b))).toEqual(11);
  expect(contents(sub(a, b))).toEqual(-3);
  expect(contents(mul(a, b))).toEqual(28);
  expect(contents(div(a, b))).toBeCloseTo(0.57);
});

test('complex numbers', () => {
  const a = makeComplex(makeRectangular(5, 3));
  const b = makeComplex(makeRectangular(1, 2));

  const added = contents(add(a, b));
  expect(realPart(added)).toBeCloseTo(6);
  expect(imagPart(added)).toBeCloseTo(5);

  const subtracted = contents(sub(a, b));
  expect(realPart(subtracted)).toBeCloseTo(4);
  expect(imagPart(subtracted)).toBeCloseTo(1);

  const multiplied = contents(mul(a, b));
  expect(realPart(multiplied)).toBeCloseTo(-1);
  expect(imagPart(multiplied)).toBeCloseTo(13);

  const divided = contents(div(a, b));
  expect(realPart(divided)).toBeCloseTo(2.2);
  expect(imagPart(divided)).toBeCloseTo(-1.4);
});
