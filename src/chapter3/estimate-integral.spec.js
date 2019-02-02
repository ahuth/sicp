import monteCarlo from './monte-carlo';
import randomInt from './random-int';
import { square } from '../chapter1';

function estimateIntegral(predicate, x1, x2, y1, y2) {
  const trials = 1000;
  // Select points within our bounding rectangle. See how many are also within our circle.
  const ratioWithin = monteCarlo(trials, () => {
    return predicate(randomInt(x1, x2), randomInt(y1, y2));
  });
  // The ratio of points within the rectangle AND the circle can be combined with the area
  // of the rectangle to get an estimate of the area of the circle.
  const rectangleArea = (x1 - x2) * (y1 - y2);
  return ratioWithin * rectangleArea;
}

test('estimating an integral', () => {
  // Predicate testing whether a point is within a circle of radius 3, centered at (5, 7).
  const p = (x, y) => square(x - 5) + square(y - 7) <= square(3);

  // Check points within the rectangle with corners (2, 4) and (8, 10).
  const result = estimateIntegral(p, 2, 8, 4, 10);

  // Really should be around 28.3.
  expect(result).toBeGreaterThanOrEqual(19);
  expect(result).toBeLessThanOrEqual(24);
});

test('estimating pi', () => {
  // Predicate testing whether a point is within a circle of radius 1, centered at (0, 0).
  const p = (x, y) => square(x) + square(y) <= 1;

  // Check points within the rectangle with corners (-1, -1) and (1, 1).
  const result = estimateIntegral(p, -1, 1, -1, 1);

  // Really should be around 3.14.
  expect(result).toBeGreaterThanOrEqual(2);
  expect(result).toBeLessThanOrEqual(4);
});
