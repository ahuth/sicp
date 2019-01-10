import {
  makeRectangular,
  makePolar,
  realPart,
  imagPart,
  magnitude,
  angle,
  complexAdd,
  complexSub,
  complexMul,
  complexDiv,
} from './complex-number';

test('complex numbers', () => {
  const a = makeRectangular(2, 3);
  const b = makePolar(6, Math.PI / 4);

  expect(realPart(a)).toBeCloseTo(2);
  expect(imagPart(a)).toBeCloseTo(3);
  expect(magnitude(a)).toBeCloseTo(3.61);
  expect(angle(a)).toBeCloseTo(0.98);

  expect(realPart(b)).toBeCloseTo(4.24);
  expect(imagPart(b)).toBeCloseTo(4.24);
  expect(magnitude(b)).toBeCloseTo(6);
  expect(angle(b)).toBeCloseTo(Math.PI / 4);

  const added = complexAdd(a, b);
  expect(realPart(added)).toBeCloseTo(2 + 4.24);
  expect(imagPart(added)).toBeCloseTo(3 + 4.24);

  const subtracted = complexSub(a, b);
  expect(realPart(subtracted)).toBeCloseTo(2 - 4.24);
  expect(imagPart(subtracted)).toBeCloseTo(3 - 4.24);

  const multiplied = complexMul(a, b);
  expect(realPart(multiplied)).toBeCloseTo(-4.24);
  expect(imagPart(multiplied)).toBeCloseTo(21.21);

  const divided = complexDiv(a, b);
  expect(realPart(divided)).toBeCloseTo(0.59);
  expect(imagPart(divided)).toBeCloseTo(0.12);
});
