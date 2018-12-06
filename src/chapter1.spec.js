import { sumTwoLargestSquares, sqrt } from './chapter1';

test('exercise 1.2', () => {
  expect(sumTwoLargestSquares(1, 2, 3)).toEqual(13);
});

test('exercise 1.5', () => {
  expect(sqrt(137)).toBeCloseTo(11.7046999177, 8);
});
